const express = require('express');
const router = express.Router();
const { User } = require("../models/User");

const { auth } = require("../middleware/auth");
const { Board } = require('../models/Board');

router.post("/register", (req, res) => {
    User.findOne({email: req.body.email}, (err, checkUser) => {
        if(err) return res.json({success: false, err})
        if(checkUser) return res.json({register: false, message: "동일한 이메일의 유저가 이미 있습니다"})

        const user = new User(req.body)
        user.save((err, userInfo) => {
            if(err) return res.json({success: false, err})
            return res.status(200).json({success: true, userInfo})
        })
    })
})

router.post("/login", (req, res) => {
  User.findOne({email: req.body.email}, (err, user) => {
    if(!user) return res.json({loginSuccess: false, message: "제공된 이메일에 해당하는 유저가 없습니다"})
    user.comparePassword(req.body.password, (err, isMatch) => {
      if(!isMatch) return res.json({loginSuccess: false, message: "비밀번호가 틀렸습니다"})
      user.generateToken((err, user) => {
        if(err) return res.status(400).send(err)
        res.cookie("x_auth", user.token)
          .status(200).json({loginSuccess: true, userId: user._id})
      })
    })
  })
})

router.get("/logout", auth, (req, res) => {
  User.findOneAndUpdate({_id: req.user.id}, {token: ""}, (err, user) => {
    if(err) res.json({success: false, err})
    return res.status(200).send({success: true})
  })
})

router.post("/modify", (req, res) => {
  User.findOneAndUpdate({email: req.body.email}, {name: req.body.name, password: req.body.password}, (err, user) => {
    user.generatePassword(req.body.password, (err, encrypted) => {
      if(err) return res.json({success: false, message: "비밀번호 수정에 실패했습니다"})
      User.findOneAndUpdate({email: user.email}, {password: encrypted}, (err, user) => {
        if(err) res.json({success: false, err})
        return res.status(200).send({success: true})
      })
    })
  })
})

router.post("/hadFavorite", (req, res) => {
  User.find({_id: req.body.id})
    .populate("_id")
    .exec((err, user) => {
      if(err) return res.status(400).send(err)
        let result = false
        for(i in user[0].favoriteBoards) {
          // console.log("userFav1 : "+ user[0].favoriteBoards[i].boardId, "req : "+ req.body.boardId.boardId)
          if(req.body.boardId.boardId === user[0].favoriteBoards[i].boardId) {
            result = true
          }
        }
        return res.status(200).json({success: true, favorite: result})
    })
})

router.post("/makeFavorite", (req, res) => {
  User.findOneAndUpdate({_id: req.body.id}, {$push: {favoriteBoards: req.body.boardId}}, (err, user) => {
    if(err) return res.json({success: false, message: "관심글 등록에 실패했습니다."})
    return res.status(200).send({success: true})
  })
})

router.post("/cancelFavorite", (req, res) => {
  User.findByIdAndUpdate({_id: req.body.id}, {$pull: {favoriteBoards: req.body.boardId}}, (err, user) => {
      if(err) return res.json({success: false, message: "관심글 삭제에 실패했습니다."})
      return res.status(200).send({success: true})
  })
})

router.post("/getFavoriteBoards", (req, res) => {
  User.findOne({_id: req.body.myId}, (err, user) => {
    // console.log("user : "+ user.favoriteBoards[0].boardId)
    if(err) return res.status(400).json({success: false})
    let FavoriteList = []
    for(i in user.favoriteBoards) {
      FavoriteList.push(user.favoriteBoards[i].boardId)
    }
    Board.find({_id: {$in: FavoriteList}})
      .sort({createdAt: 'desc'})
      .populate("writer")
      .exec((err, boards) => {
      if(err) return res.json({success: false, message: "관심글을 불러오는데 실패했습니다."})
      return res.status(200).json({success: true, boards})
    })
  })
})

router.get("/auth", auth, (req, res) => {
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image
  })
})

module.exports = router