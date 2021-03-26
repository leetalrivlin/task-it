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

async function save(board) {
  try {
    const collection = await dbService.getCollection('board');
    if (board._id) {
      board._id = ObjectId(board._id);
       await collection.updateOne({ _id: board._id }, { $set: board });
      return board
    } else {
      const res = await collection.insertOne(board);
      return res.ops[0];
    }
  } catch (err) {
    logger.error(`cannot update board ${board._id}`, err);
    throw err;
  }
}

async function remove(boardId) {
  try {
      // const store = asyncLocalStorage.getStore()
      // const { userId, isAdmin } = store
      const collection = await dbService.getCollection('board')
      // remove only if user is owner/admin
      // const query = { _id: ObjectId(reviewId) }
      // if (!isAdmin) query.byUserId = ObjectId(userId)
      await collection.deleteOne({ _id: ObjectId(boardId)})
      // return await collection.deleteOne({ _id: ObjectId(reviewId), byUserId: ObjectId(userId) })
  } catch (err) {
      logger.error(`cannot remove review ${reviewId}`, err)
      throw err
  }
}

module.exports = {
  query,
  getById,
  save,
  remove
};
