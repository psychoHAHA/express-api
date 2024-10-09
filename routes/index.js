const express = require('express')
const router = express.Router()
const multer = require('multer')
const UserController = require('../controllers/userController')
const authenticateToken = require('../middleware/auth')
const PostController = require('../controllers/postController')
const CommentController = require('../controllers/commentController')
const LikeController = require('../controllers/likeController')
const FollowController = require('../controllers/followController')

const uploadDestination = 'uploads'

// показываем, где хранить файл
const storage = multer.diskStorage({
  destination: uploadDestination,
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  },
})

const uploads = multer({ storage: storage })

// роуты пользователя
router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.get('/current', authenticateToken, UserController.current)
router.get('/users/:id', authenticateToken, UserController.getUserById)
router.put(
  '/users/:id',
  authenticateToken,
  uploads.single('avatar'),
  UserController.updateUser
)

// роуты постов

router.post('/posts', authenticateToken, PostController.createPost)
router.get('/posts', authenticateToken, PostController.getAllPosts)
router.get('/posts/:id', authenticateToken, PostController.getPostById)
router.delete('/posts/:id', authenticateToken, PostController.deletePost)

// роуты комментов
router.post('/comments', authenticateToken, CommentController.createComment)
router.delete(
  '/comments/:id',
  authenticateToken,
  CommentController.deleteComment
)

// роуты лайков
router.post('/likes', authenticateToken, LikeController.likePost)
router.delete('/likes/:id', authenticateToken, LikeController.unlikePost)

// роуты подписок
router.post('/follow', authenticateToken, FollowController.followUser)
router.delete('/unfollow/:id', authenticateToken, FollowController.unfollowUser)

module.exports = router
