import React, { useContext, useState } from "react";

import { Avatar, Col, Row, Button, Form, Input } from "antd";

const Editor = ({ comment, CommentContext }) => {
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

export default Editor;
