const express = require('express');
const {requireAuth, requireAdmin} = require('../../middlewares/requireAuth.middleware')
// const {log} = require('../../middlewares/logger.middleware')
const { getBoard, getBoards, saveBoard, deleteBoard } = require('./board.controller');
const router = express.Router();

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', getBoards);
router.get('/:id', getBoard);
router.put('/:id', saveBoard);
router.delete('/:id', deleteBoard);
router.post('/',requireAuth, saveBoard);
// router.post('/', saveBoard);


module.exports = router;
