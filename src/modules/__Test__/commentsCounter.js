const commentsData = {};

export function createComment(appId, itemId, username, comment) {
  if (!Object.prototype.hasOwnProperty.call(commentsData, appId)) {
    commentsData[appId] = {};
  }

  if (!Object.prototype.hasOwnProperty.call(commentsData[appId], itemId)) {
    commentsData[appId][itemId] = [];
  }

  commentsData[appId][itemId].push({
    comment,
    creation_date: new Date().toISOString().split('T')[0],
    username,
  });
}

export function getComments(appId, itemId) {
  if (Object.prototype.hasOwnProperty.call(commentsData, appId)
    && Object.prototype.hasOwnProperty.call(commentsData[appId], itemId)) {
    return commentsData[appId][itemId];
  }

  return [];
}

export function clearComments() {
  Object.keys(commentsData).forEach((appId) => {
    commentsData[appId] = {};
  });
}
