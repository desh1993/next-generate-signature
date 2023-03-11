export function recursiveFind(comments, commentId) {
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

export function createId() {
  return Math.floor(Math.random() * (999 - 100 + 1) + 100);
}

export function slicingComments(comments, pageNumber, size) {
  let to = pageNumber * size;
  let from = to - size;
  let newComments = comments.slice(from, to);
  let next = comments[to + 1];
  return {
    comments: newComments,
    next: next !== undefined,
  };
}

/**
 * To build comments in this structure
 * listofComments = {
 *  comments: [],
 *  next: true
 * }
 */
export function buildListOfComments(listOfComments) {
  if (listOfComments.length > 0) {
    return slicingComments(listOfComments, 1, 3);
  }
  return null;
}

//find(comments, x => x.id === 131)
export function find(data, fn) {
  let found = [];

  JSON.stringify(data, (key, val) => {
    if (fn(val)) found.push(val);
    return val;
  });

  return found;
}

// builds {next : true , comments: the next set of comments}
export function getNext(comments, commentId, from, to) {
  const lastComment = recursiveFind(comments, commentId);
  const { parentId } = lastComment;
  if (parentId === null) {
    const index = comments.findIndex((c) => c.id === lastComment.id);
    const next = comments[index + 1] !== undefined;
    return {
      next,
      comments: comments.slice(from, to),
    };
  }
  const parentComments = recursiveFind(comments, parentId);
  const lastIndex = parentComments.comments.findIndex(
    (c) => c.id === commentId
  );
  const next = parentComments.comments[lastIndex + 1] !== undefined;
  return {
    next,
    comments: parentComments.comments.slice(from, to),
  };
}

export function findPage(pages, lastId) {
  let page = pages.find((page) => page.lastId === lastId);
  console.log(page);
  return page;
}
