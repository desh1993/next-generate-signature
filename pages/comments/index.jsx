import React, {
  useState,
  useContext,
  useReducer,
  createContext,
  useRef,
} from "react";
import { Avatar, Col, Row, Button, Form, Input } from "antd";
import { comments } from "./comments";
const { TextArea } = Input;
const CommentContext = createContext();

function recursiveFind(comments, commentId) {
  const result = [];
  function loop(comments, commentId, result) {
    for (const comment of comments) {
      if (comment.id === commentId) {
        result.push(comment);
      }
      if (result.length <= 0 && comment.comments) {
        loop(comment.comments, commentId, result);
      }
    }
  }
  loop(comments, commentId, result);
  return result.length > 0 ? result[0] : false;
}

function createId() {
  return Math.floor(Math.random() * (999 - 100 + 1) + 100);
}

// initial state
const initialState = {
  repliedComments: [],
  comments,
};

function reducer(state, action) {
  switch (action.type) {
    case "replyingComment":
      if (
        state.repliedComments.findIndex(
          (comment) => comment.id === action.payload < 0
        )
      ) {
        return {
          ...state,
          repliedComments: [
            ...state.repliedComments,
            {
              id: action.payload,
              reply: "",
            },
          ],
        };
      }
      return state;
    case "cancelComment":
      if (
        state.repliedComments.findIndex(
          (comment) => comment.id === action.payload >= 0
        )
      ) {
        return {
          ...state,
          repliedComments: state.repliedComments.filter(
            (comment) => comment.id !== action.payload
          ),
        };
      }
      return state;
    case "submitComment":
      let found = recursiveFind(state.comments, action.payload.id);
      if (found) {
        let commentobj = {
          id: createId(),
          text: action.payload.reply,
          comments: [],
        };
        found.comments.push(commentobj);
        return {
          ...state,
          comments: state.comments,
        };
      }
      return state;
    default:
      throw new Error();
  }
}

const Editor = ({ comment }) => {
  const { isCommentBeingReplied, dispatch } = useContext(CommentContext);
  const [value, setvalue] = useState("");
  const onSubmit = async (e) => {
    e.preventDefault();
    await dispatch({
      type: "submitComment",
      payload: {
        id: comment.id,
        reply: value,
      },
    });
    return dispatch({
      type: "cancelComment",
      payload: comment.id,
    });
  };
  const handleChange = (e) => {
    setvalue(e.target.value);
  };
  return (
    <div>
      <Form.Item>
        <TextArea
          rows={4}
          id="message"
          name="message"
          onChange={handleChange}
        />
        {/* <textarea ref={textRef} id="message" name="message" /> */}
      </Form.Item>
      <Form.Item>
        <Button
          htmlType="submit"
          // loading={submitting}
          onClick={(e) => onSubmit(e)}
          type="primary"
        >
          Reply
        </Button>
        <Button
          type="danger"
          onClick={(e) =>
            dispatch({
              type: "cancelComment",
              payload: comment.id,
            })
          }
        >
          Cancel
        </Button>
      </Form.Item>
    </div>
  );
};

const Comments = ({ listOfComments }) => {
  const { isCommentBeingReplied, dispatch } = useContext(CommentContext);

  return (
    <div>
      {listOfComments.map((comment) => {
        return (
          <Col
            key={comment.id}
            span={24}
            style={{ marginLeft: "2em", marginTop: "1em" }}
          >
            <p>{comment.text}</p>
            {!isCommentBeingReplied(comment.id) && (
              <div>
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    return dispatch({
                      type: "replyingComment",
                      payload: comment.id,
                    });
                  }}
                  type="primary"
                  ghost
                  style={{ marginTop: "1em" }}
                >
                  Add Comment
                </Button>
              </div>
            )}
            {isCommentBeingReplied(comment.id) && <Editor comment={comment} />}
            {comment.comments.length > 0 && (
              <Row>
                <Comments listOfComments={comment.comments} />
              </Row>
            )}
          </Col>
        );
      })}
    </div>
  );
};

const NewComment = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const isCommentBeingReplied = (commentId) => {
    return state.repliedComments.findIndex(
      (comment) => comment.id === commentId
    ) >= 0
      ? true
      : false;
  };
  return (
    <CommentContext.Provider value={{ isCommentBeingReplied, dispatch }}>
      <Row>
        <Comments listOfComments={state.comments} />
      </Row>
    </CommentContext.Provider>
  );
};

export default NewComment;
