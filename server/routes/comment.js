const express = require('express');
const router = express.Router();
const { Comment } = require("../models/Comment")

router.post("/saveComment", (req, res) => {
    const comment = new Comment(req.body)
    comment.save((err, comment) => {
        if(err) return res.json({success: false, err})
        Comment.find({_id: comment._id})
        .populate("writer")
        .exec((err, result) => {
            if(err) return res.json({success: false, err})
            return res.status(200).json({success: true, result})
        })
    })
})

router.post("/getComments", (req, res) => {
    Comment.find({targetBoard: req.body.boardId})
    .populate("writer")
    .exec((err, comments) => {
        if(err) return res.status(400).json({success: false, err})
        return res.status(200).json({success: true, comments})
    })
})

router.post("/modifyComment", (req, res) => {
    Comment.findOneAndUpdate({_id: req.body.id}, {content: req.body.content}, (err) => {
        if(err) return res.json({success: false, err})
        return res.status(200).json({success: true})
    })
})

router.post("/deleteComment", (req, res) => {
    Comment.findOneAndDelete({_id: req.body.id}, (err, deletedComment) => {
        if(err) return res.json({success: false, err})
        if(deletedComment) {
            // console.log(deletedComment)
            delComment(deletedComment)
        }
        return res.status(200).send({success: true})
    })
})

// const checkComment = (comment) => {
//     Comment.find({responseTo: comment._id}, (err, returnComment) => {
//         if(err) return res.json({success: false, err})
//         console.log("length : "+returnComment.length)
//         return returnComment.length
//     })
// }

const delComment = (deletedComment) => {
    // let check = 0
    // check = checkComment(deletedComment)
    // console.log("체크 : "+check)
    
    Comment.find({responseTo: deletedComment._id}, (err, returnComment) => {
        if(err) return res.json({success: false, err})
        let check = returnComment.length
        
        for(let i=0; i <= check; i++) {
            // console.log(i+" 번째 돌리기")
            Comment.findOneAndDelete({responseTo: deletedComment._id}, (err, deletedComment2) => {
                if(err) return res.json({success: false, err})
                if(deletedComment2) {
                    // console.log(deletedComment2)
                    delComment(deletedComment2)
                }
            })
        }
    })
}

module.exports = router