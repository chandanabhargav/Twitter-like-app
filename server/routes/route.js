const express = require('express')
const router = express.Router()
let User = require('../models/User')
let Tweet = require('../models/Tweet')
let Followers = require('../models/Followers')
let jwt = require('jsonwebtoken');
let verifyToken = require('../verifyToken');
const bcrypt = require('bcrypt')
const saltRounds = 10

router.get('/', (req, res, next) => {
    res.send('Server here')    
})

router.route('/login').post((req, res) => {   
    User.findOne({email: req.body.email.toLowerCase()})
        .exec(function(err, user) { 
            if(err) { 
                res.json(err)
            }
            //console.log(req.body)
            console.log(user)
            if(user) {
                bcrypt.compare(req.body.password, user.password, function(error, data) { 
                    let token = jwt.sign(req.body, global.config.secretKey, {
                        algorithm: global.config.algorithm,
                        expiresIn: '10m'
                        });
                        
                        res.status(200).json({
                        message: 'Login Successful',
                        user: user,
                        jwtoken: token
                    });
                })
            }
            else {
                res.sendStatus(404)
            }
    })
})

router.route('/createUser').post((req, res, next) => { 
    //res.json(req.body)
    if(req.body.password) { 
        var password = req.body.password 
        req.body.email = req.body.email.toLowerCase()
        //console.log(password)
        bcrypt.hash(password, saltRounds, function(error, hash) { 
            if(error) { 
                res.send(error)
            }
            else { 
                //console.log(hash)
                req.body.password = hash
                User.create(req.body, (err, data) => { 
                    if(err) {
                        res.send(err)
                    }
                    else {
                        res.json(data)
                    }
                })
            }
        })
    }
})

router.route('/deleteUser').delete((req, res, next) => {
    var id = req.params.id
    console.log(id)
    User.findOneAndRemove(id, function(err, data) {
        if(err) {
            res.send(err)
        }
        else {
            res.status(200).json({
                msg: data
            })
        }
    })
})

router.post('/likeTweet', verifyToken, (req, res, next) => { 
    Tweet.findByIdAndUpdate({_id: req.body._id}, { 
        $push: { likes: req.body.follower },
        $inc: { noOfLikes: 1 }, 
    }, (err, data) => {
        if(err) {
            res.send(err)
        }
        else {
            res.json(data)
        }
    })
})

router.post('/unLikeTweet', verifyToken, (req, res, next) => { 
    Tweet.findByIdAndUpdate({_id: req.body._id}, { 
        $pull : { likes: req.body.follower },
        $inc : { noOfLikes: -1 }, 
    }, (err, data) => {
        if(err) {
            res.send(err)
        }
        else {
            res.json(data)
        }
    })
})

router.route('/updateUser/:id').put((req, res, next) => {
    User.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (err, data) => {
        if(err)
            res.send(err)
        else { 
            res.json(data)
        }
    })
})

router.get('/read/:id', verifyToken, (req, res) => { 
    //res.json(req);
    User.findById(req.params.id, (err, user) => { 
        if(err) {
            res.send(err)
        }
        else {
            res.json(user)
        }
    })
})

/* router.route('/users').get((req, res, next) => { 
    User.find((err, users) => { 
        if(err) { 
            res.send(err)
        } 
        else { 
            res.json(users)
        } 
    })
}) */

router.get('/users', verifyToken, (req, res, next) => { 
    User.find((err, users) => { 
        if(err) { 
            res.send(err)
        } 
        else { 
            res.json(users)
        } 
    })
});

router.post('/follow', verifyToken, (req, res, next) => { 
    Followers.create((req.body), (err, follower) => { 
        if(err) {
            res.send(err)
        }
        else {
            res.json(follower)
        }
    })
})

router.get('/getFollowers/:id', verifyToken, (req, res, next) => {
    let userId = req.params.id
    Followers.find({userId: userId}, (err, followers) => {
        if(err) {
            res.send(err)
        }
        else {
            res.json(followers)
        }
    })
})

router.get('/getOwnTweets/:id', verifyToken, (req, res, next) => {
    Tweet.find({userId: req.params.id}).sort('-creationTime').exec((err, tweets) => {
        if(err) {
            res.send(err)
        }
        else {
            res.json(tweets)
        }
    })
})

router.get('/getUserTweets/:id', verifyToken, (req, res, next) => {
    Followers.aggregate([
      {
         $lookup:{
            from:"users",
            localField: "userId",
            foreignField:"_id",
            as:"users"
         }
      },
      { $match : { "follower" : mongoose.Types.ObjectId(req.params.id) } },
      
       {
        $lookup:{
           from:"tweets",
           localField:"userId",
           foreignField:"userId",
           as:"tweets"
        }
       },
       { $sort: { "creationtime": -1 }}, 
      // { $match: { "tweets.tweet" : { $ne : [] } }}
       /* { 
        $project:{
            follower: "$_id",
           following: "$users.username",
           tweets: "$tweets.$tweet",
           creationTime: "$tweets.creationTime"
        }
    }  */
    ]).then(data => {
        res.json(data)
        console.log(data)
    });
})

router.post('/createTweet', verifyToken, (req, res, next) => {
    Tweet.create(req.body, (err, data) => {
        if(err) {
            res.send(err)
        }
        else {
            res.json(data)
        }
    })
})

router.get('/tweets', verifyToken, (req, res, next) => { 
    Tweet.find((err, tweets) => { 
        if(err) { 
            res.send(err)
        } 
        else { 
            res.json(tweets)
        } 
    })
})

router.get('/getNonFollowing/:id', verifyToken, (req, res, next) => { 
    let userId = req.params.id
    Followers.find({follower: userId}, (err, following) => { 
        if(err) {
            return err
        }
        else {
            return following
        }
    }).then((following) => { 
        console.log(following)
        let followingArr = []
        following.forEach(element => {
            followingArr.push(element.userId)
        });
        followingArr.push(userId)
        console.log(followingArr)
        User.find().where("_id").nin(followingArr).exec((err, users) => { 
            if(err) {
                res.send(err)
            }
            else {
                res.json(users)
            }
        })
    })
})

router.get('/getUsersFollowing/:id', verifyToken, (req, res, next) => {
    let userId = req.params.id
    Followers.find({follower: userId}, (err, following) => { 
        if(err) {
            return err
        }
        else {
            return following
        }
    }).then((following) => { 
        console.log(following)
        let followingArr = []
        following.forEach(element => {
            followingArr.push(element.userId)
        });
        //console.log(followingArr)
        User.find().where("_id").in(followingArr).exec((err, users) => { 
            if(err) {
                res.send(err)
            }
            else {
                res.json(users)
            }
        })
    })
})

router.get('/getUserFollowers/:id', verifyToken, (req, res, next) => {
    if(req.params.id) {
        let userId = req.params.id
        followersArr = []
        Followers.find({userId: userId}, (err, followers) => {
            if(err) {
                res.send(err)
            }
            else {
                followers.forEach(element => { 
                    followersArr.push(element.follower)
                })
                console.log('Followers: ' + followers)
                User.find().where('_id').in(followersArr).exec((error, users) => {
                    if(error) {
                        res.send(error)
                    }
                    else {
                        console.log('Users: ' + users)
                        res.json(users)
                    }
                })
            }
        })
    }
})

router.post('/unfollow', verifyToken, (req, res, next) => {
    let userId = req.body.userId
    let follower = req.body.follower
    Followers.findOneAndDelete({userId: userId, follower: follower}, (err, fol) => {
        if(err) {
            res.send(err)
        }
        else {
            res.json(fol)
        }
    })
})

module.exports = router