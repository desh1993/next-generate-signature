import { find, recursiveFind, getNext, findPage } from "utilities/helper";
import { comments } from "../comments";

export function reducer(state, action) {
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
    case "loadingMoreComment":
      console.log(
        `Page number is ${action.payload.pageNumber} , Last id is ${action.payload.id}`
      );
      let to = action.payload.pageNumber * action.payload.size;
      let from = to - action.payload.size;
      const next = getNext(comments, action.payload.id, from, to); //gets the next element
      let newList = {
        comments: state.list.comments.concat(next.comments),
        next: next.next,
      };
      return {
        ...state,
        list: newList,
        pageNumber: action.payload.pageNumber + 1,
      };
    case "getPage":
      let page = findPage(state.pages, action.payload.id);
      if (!page) {
        let newPage = {
          lastId: action.payload.id,
          page: 2,
        };
        let result = state.pages.push(newPage);
        return {
          ...state,
          pages: result,
        };
      }
      return {
        ...state,
      };
    default:
      throw new Error();
  }
}
