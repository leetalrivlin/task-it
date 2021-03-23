const dbService = require('../../services/db.service');
const logger = require('../../services/logger.service');
// const reviewService = require('../review/review.service')
const ObjectId = require('mongodb').ObjectId;

async function query() {
  try {
    const collection = await dbService.getCollection('board');
    var boards = await collection.find().toArray();
    return boards;
  } catch (err) {
    logger.error('cannot find boards', err);
    throw err;
  }
}

async function getById(boardId) {
  try {
    const collection = await dbService.getCollection('board');
    const board = await collection.findOne({ _id: ObjectId(boardId) });
    return board;
  } catch (err) {
    logger.error(`while finding board ${boardId}`, err);
    throw err;
  }
}

async function update(board) {
  try {
    board._id = ObjectId(board._id);
    // const boardToSave = {
    //   _id: ObjectId(board._id),
    //   title: board.title,
    //   createdAt: board.createdAt,
    //   createdBy: board.createdBy,
    //   style: board.style,
    //   labels: board.labels,
    //   members: board.members,
    //   groups: board.groups,
    //   activities: board.activities,
    // };
    const collection = await dbService.getCollection('board');
    await collection.updateOne({ _id: board._id }, { $set: board });
    return board;
  } catch (err) {
    logger.error(`cannot update board ${board._id}`, err);
    throw err;
  }
}

module.exports = {
  query,
  getById,
  update,
};
