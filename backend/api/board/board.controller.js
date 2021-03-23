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

async function updateBoard(req, res) {
  try {
    const board = req.body;
    console.log('req.body', req.body);
    const savedBoard = await boardService.update(board);
    res.send(savedBoard);
    // socketService.broadcast({ type: 'board-updated', data: review, to: savedBoard._id });
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

module.exports = {
  getBoard,
  getBoards,
  updateBoard,
};
