const express = require('express');
const router = express.Router();
const { Board } = require("../models/Board");
const { Comment } = require('../models/Comment');

router.post("/uploadBoard", (req, res) => {
    const board = new Board(req.body)
    board.save((err) => {
        if(err) return res.json({success: false, err})
        return res.status(200).json({success: true})
    })
})

router.post("/modifyBoard", (req, res) => {
    Board.findOneAndUpdate({_id: req.body.boardId}, {title: req.body.title, description: req.body.description, private: req.body.private}, (err) => {
        if(err) return res.json({success: false, err})
        return res.status(200).json({success: true})
    })
})

router.get("/getBoards", (req, res) => {
    Board.find()
        .populate("writer")
        .exec((err, boards) => {
            if(err) return res.status(400).send(err)
            return res.status(200).json({success: true, boards})
        })
})

router.post("/getMyBoards", (req, res) => {
    Board.find({writer: req.body.myId})
        .populate("writer")
        .exec((err, boards) => {
            if(err) return res.status(400).send(err)
            return res.status(200).json({success: true, boards})
        })
})

router.post("/getBoardDetail", (req, res) => {
    Board.findOne({_id: req.body.boardId})
        .populate("writer")
        .exec((err, boardDetail) => {
            // console.log(boardDetail)
            if(err) return res.status(400).send(err)
            return res.status(200).json({success: true, boardDetail})
    })
})

router.get("/removeBoard", (req, res) => {
    Board.findOneAndDelete({_id: req.query._id}, (err) => {
            if(err) return res.json({success: false, err})
            Comment.deleteMany({targetBoard: req.query._id}, (err) => {
                if(err) return res.json({success: false, err})
                return res.status(200).send({success: true})
            })
        }
    )
})

module.exports = router