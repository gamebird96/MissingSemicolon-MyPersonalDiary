var express = require('express');
var cors = require('cors');
var passport = require('passport');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var path = require('path');
var jwt = require('express-jwt');
var multer = require('multer');
var GridFsStorage = require('multer-gridfs-storage');
var Grid = require('gridfs-stream');
var auth = jwt(
{
    secret: 'MY_SECRET',
    userProperty: 'payload'
});
var ObjectId = mongoose.Types.ObjectId;
const app = express()
const router = express.Router();
var user = require('./models/user');
var posts = require('./models/post');
require('./config/passport');

var auth = require('./controllers/authentication');
var profile = require('./controllers/profile');
var postController = require('./controllers/postController');
var searchController = require('./controllers/searchController');
app.use(cors());
app.use(bodyparser.json());
mongoose.connect('mongodb://localhost:27017/diary-test');
const connection = mongoose.connection;
/**
 * Sees if database connection established successfuly
 */
connection.once('open', () => 
{
    console.log('MongoDB database connection established successfully!');
});

//app.get('/', (req, res) => 
//{
//	res.send('Hello World');
//});

router.route('/users').get((req, res) => {
    user.find((err, users) => {
        if (err)
            console.log(err);
        else
            res.json(users);
    });
});

router.route('/issues/:id').get((req, res) => {
    Issue.findById(req.params.id, (err, issue) => {
        if (err)
            console.log(err);
        else
            res.json(issue);
    })
});

/**
 * Checks if unauthorized user
 */
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401);
    res.json({"message" : err.name + ": " + err.message});
  }
});
/*
router.route('/user/add').post((req, res) => {
    let userobj = new user(req.body);
    //console.log('req body'+JSON.parse(req.body));
    userobj.save()
        .then(user => {
            res.status(200).json({'user': 'Added successfully'});
        })
        .catch(err => {
            res.status(400).send('Failed to create new record');
        });
});
*/
//router.get('/profile', auth, profile.profileRead);
/**
 * Registers authenticated user
 */
router.post('/user/add', auth.register);
/**
 * Reads profile of user from backend
 */
router.get('/profile', profile.profileRead);
/**
 * Logs in authenticated user
 */
router.post('/login', auth.login);
/**
 * Adds new post of user
 */
router.post('/posts/add', postController.addPost);
/**
 * Removes post of user
 */
router.post('/posts/remove', postController.removePost);
/**
 * Searches post when user queries
 */
router.post('/search', searchController.searchByQuery);
//router.get('posts/view', postController.viewPosts);

/**
 * Used when user wants to get image 
 */
router.get('/posts/img', (req, res) => {

    posts.find({ '_id': ObjectId(req.query.id) }, 'image', (err, img) => {
        if (err) console.log(err);
        else res.json(img);
    });
});
/**
 * Used when user wants to view post again
 */
router.get('/posts/view', (req, res) => {
    
    posts.find({ uname: req.query.uname }, 'title post timestamp image', (err, postslist) => {
        if (err)
            console.log(err);
        else
            res.json(postslist);
    });
});

//router.post('/posts/add', (req, res) =>
//{
//    console.log('fuck you');
//});
router.route('/issues/update/:id').post((req, res) => {
    Issue.findById(req.params.id, (err, issue) => {
        if (!issue)
            return next(new Error('Could not load Document'));
        else {
            issue.title = req.body.title;
            issue.responsible = req.body.responsible;
            issue.description = req.body.description;
            issue.severity = req.body.severity;
            issue.status = req.body.status;            issue.save().then(issue => {
                res.json('Update done');
            }).catch(err => {
                res.status(400).send('Update failed');
            });
        }
    });
});

router.route('/issues/delete/:id').get((req, res) => {
    Issue.findByIdAndRemove({_id: req.params.id}, (err, issue) => {
        if (err)
            res.json(err);
        else
            res.json('Removed successfully');
    });
});
app.use('/', router);
app.listen(3000, ()=>
{
	console.log('Server running on port 3000');
});