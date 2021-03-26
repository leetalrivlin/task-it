const boardService = require('./board.service');
const socketService = require('../../services/socket.service');
const logger = require('../../services/logger.service');

async function getBoard(req, res) {
  try {
    const board = await boardService.getById(req.params.id);
    res.send(board);
  } catch (err) {
    logger.error('Failed to get board', err);
    res.status(500).send({ err: 'Failed to get board' });
  }
}

async function saveBoard(req, res) {
  try {
    const board = req.body;
    const savedBoard = await boardService.save(board);
    socketService.broadcast({ type: 'board-updated', data: savedBoard, room: savedBoard._id });
    res.send(savedBoard);
  } catch (err) {
    logger.error('Failed to update board', err);
    res.status(500).send({ err: 'Failed to update board' });
  }
}

async function getBoards(req, res) {
  try {
    const boards = await boardService.query();
    res.send(boards);
  } catch (err) {
    logger.error('Failed to get boards', err);
    res.status(500).send({ err: 'Failed to get boards' });
  }
}

async function deleteBoard(req, res) {
  try {
    await boardService.remove(req.params.id);
    res.send({ msg: 'Deleted successfully' });
  } catch (err) {
    logger.error('Failed to delete board', err);
    res.status(500).send({ err: 'Failed to delete board' });
  }
}

module.exports = {
  getBoard,
  getBoards,
  saveBoard,
  deleteBoard,
};
