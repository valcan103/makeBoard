const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const saltRounds = 10
const jwt = require("jsonwebtoken")

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true, //공백 제거
        unique: 1
    },
    password: {
        type: String,
        minlength: 5
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: {
        type: Number,
        default: 0
    },
    image: String,
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    },
    favoriteBoards: {
        type: Array
    }
})

userSchema.pre("save", function(next) {
    var user = this

    if(user.isModified("password")) {
        bcrypt.genSalt(saltRounds, function(err, salt) {
            if(err) return next(err)
            
            bcrypt.hash(user.password, salt, function(err, hash) {
                // Store hash in your password DB.
                if(err) return next(err)
                user.password = hash
                next()
            });
        });
    } else {
        next()
    }
})

userSchema.methods.generatePassword = function(plainPassword, callback) {
    bcrypt.genSalt(saltRounds, function(err, salt) {
        if(err) throw(err)
        bcrypt.hash(plainPassword, salt, function(err, hash) {
            if(err) throw(err)
            callback(null, hash)
            })
        })
}

userSchema.methods.comparePassword = function(plainPassword, callback) {
    bcrypt.compare(plainPassword, this.password, function(err, isMatch) {
        if(err) return callback(err)
        callback(null, isMatch)
    })
}

userSchema.methods.generateToken = function(callback) {
    var user = this
    var token = jwt.sign(user._id.toHexString(), "secretToken")
    user.token = token
    user.save(function(err, user) {
        if(err) return callback(err)
        callback(null, user)
    })
}

userSchema.statics.findbyToken = function(token, callback) {
    var user = this

    jwt.verify(token, "secretToken", function(err, decoded) {
        user.findOne({_id: decoded, token: token}, function(err, user) {
            if(err) return callback(err)
            callback(null, user)
        })
    })
}

const User = mongoose.model("User", userSchema)
module.exports = { User }