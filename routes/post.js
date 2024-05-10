const express = require('express');
const { getPosts, createPosts, getDetail, getUpdate, deletePost, searchPost } = require('../controllers/post.js');
const auth = require('../middleware/auth.js')

const router = express.Router();


router.get('/getPosts',getPosts)
router.post('/createPosts',auth,createPosts) //bir kişi post oluşturmak istediğinde auth'a göre olsun dedik. Yani giriş yapmış olmalı. auth middleware'den geldi
router.get('/getDetail/:id',getDetail)
router.patch('/getUpdate/:id',auth,getUpdate)
router.delete('/deletePost/:id',auth,deletePost)
router.get('/searchPost',searchPost)


module.exports = router;