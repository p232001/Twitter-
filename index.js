const express = require('express');
const router = express.Router();
const passport = require('passport');
const userModel = require('./users');
const localStrategy = require('passport-local');
// const userModel = require('./user');
// const tweetModel = require('./tweets')

passport.use(new localStrategy(userModel.authenticate()));


/* GET home page. */
router.get('/', function(req, res) {
    res.render('index');
});

router.post('/register', function(req, res, next) {
    const newUser = new userModel({
        username: req.body.username,
        email: req.body.email
    })
    userModel.register(newUser, req.body.password)
        .then(function(u) {
            passport.authenticate('local')(req, res, function() {
                // res.redirect('/profile')
                res.render("profile")
            })
        })
        .catch(function(e) {
            res.send(e);
        })
});
router.get('/new', function(req, res) {
    res.render('login');
});
router.post('/login', passport.authenticate('local', {
    successRedirect: '/profile',
    failureRedirect: '/'
}), function(req, res) {});

router.get('/profile', isLoggedIn, function(req, res, next) {
    res.render('profile');
});

router.get('/like/:tweetid', isLoggedIn, function(req, res) {
    userModel
        .findOne({ username: req.session.passport.user })
        .then(function(founderUser) {
            tweetModel
                .findOne({ _id: req.params.tweetid })
                .then(function(foundTweet) {
                    if (foundTweet.likes.indexOf(foundUser._id) === -1) {
                        foundTweet.likes.push(foundUser._id);
                    } else {
                        var existingIndex = foundTweet.likes.indexOf(foundUser_id);
                        foundTweet.likes.splice(existingIndex, 1);
                    }
                    foundTweet.save().then(function(savedTweet) {
                        res.send(savedTweet);
                    })
                })
        })
})


router.get('/edit/:tweetid', isLoggedIn, function(req, res) {
    userModel
        .findOne({ username: req.session.passport.user })
    tweetModel
        .findById(req.params.tweetid)
        .then(function(foundTweet) {

            if (foundTweet.userId.equals(foundUser._id)) {
                //do edit stuff
                res.send('show update page');
            } else {
                //this is not your tweet
                res.send("not your tweet")
            }
        });
});

// router.post('/edit/:tweetid', isLoggedIn, function(req, res) {
//         userModel
//             .findOne({ username: req.session.passport.user })
//             .then(function(foundUser) {
//                     tweetModel
//                         .findById(req.params.tweetid)
//                         .then(function(foundTweet) {

//                                 if (foundTweet.userId.equals(foundUser._id)) {
//                                     //do edit stuff
//                                     tweetModel.findOneAndUpdate({ _id: req.params.tweetid }, { caption: req.body.caption })
//                                         .then(function(updatedTweet) {
//                                                 res.send("to some page");
//                                             // } else {
//                                             //     //this is not your tweet
//                                             //     res.send("not your tweet")
//                                             // }
//                                         }
//                                 )
//                                     }

router.get('/logout', function(req, res, next) {
    req.logOut();
    res.redirect('/');
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.redirect('/');
    }
}
module.exports = router;