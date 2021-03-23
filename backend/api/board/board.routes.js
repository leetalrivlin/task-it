const express = require('express');
// const {requireAuth, requireAdmin} = require('../../middlewares/requireAuth.middleware')
// const {log} = require('../../middlewares/logger.middleware')
const { getBoard, getBoards, updateBoard } = require('./board.controller');
const router = express.Router();

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', getBoards);
router.get('/:id', getBoard);
router.put('/:id', updateBoard);

module.exports = router;
