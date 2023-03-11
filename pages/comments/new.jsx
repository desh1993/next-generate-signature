import React, {
  useState,
  useContext,
  useReducer,
  createContext,
  useRef,
} from "react";

import { Avatar, Col, Row, Button, Form, Input } from "antd";
import { comments } from "./comments";
import {
  recursiveFind,
  createId,
  slicingComments,
  buildListOfComments,
  findPage,
} from "utilities/helper";
import { reducer } from "./reducer";
import Editor from "./editor";
const { TextArea } = Input;
const CommentContext = createContext();

// initial state
const initialState = {
  repliedComments: [],
  list: slicingComments(comments, 1, 3),
  size: 3,
  pages: [],
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
    <CommentContext.Provider value={{ isCommentBeingReplied, dispatch, state }}>
      <Row>
        <Comments listOfComments={state.list} />
      </Row>
    </CommentContext.Provider>
  );
};

function Comments({ listOfComments }) {
  const { comments, next } = listOfComments;
  const { isCommentBeingReplied, dispatch, state } = useContext(CommentContext);
  return (
    <>
      {comments.length > 0 &&
        comments.map((comment) => {
          return (
            <Col
              key={comment.id}
              span={24}
              style={{ marginLeft: "2em", marginTop: "1em" }}
            >
              <p>{comment.text}</p>
              {/* Nested Comments */}
              {comment.comments.length > 0 &&
                buildListOfComments(comment.comments) && (
                  <Row>
                    <Comments
                      listOfComments={buildListOfComments(comment.comments)}
                    />
                  </Row>
                )}
            </Col>
          );
        })}
      {next === true && (
        <Button
          onClick={(e) => {
            e.preventDefault();
            let page = findPage(state.pages, comments[comments.length - 1].id);
            console.log(page);
            // return dispatch({
            //   type: "loadingMoreComment",
            //   payload: {
            //     id: comments[comments.length - 1].id,
            //     pageNumber: 2,
            //     size: state.size,
            //   },
            // });
          }}
          type="primary"
          ghost
          style={{ marginTop: "1em" }}
        >
          Load More Comments
        </Button>
      )}
    </>
  );
}
export default NewComment;
