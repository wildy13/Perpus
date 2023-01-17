const { Router } = require('express');
const {
  getUser, getMe, createUser, deleteUsers, editUsers, changePassword, uploadFile,
} = require('./controller');
const multer  = require('multer')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../frontend/static/uploads/')
  },
  filename: function (req, file, cb) {
    const { originalname } = file
    const ext = originalname.substring(originalname.lastIndexOf('.')+1, originalname.length) || originalname
    cb(null, `${req.body.username}.${ext}`)
  }
})
const upload = multer({ storage: storage })


const router = new Router();

// Get Router
router.get('/', getUser);
router.get('/me', getMe);

// POST Router
router.post('/', createUser);
router.post('/delete', deleteUsers);

// PUT Router
router.put('/:id', editUsers);
router.post('/change/:id', changePassword);

router.post('/upload', upload.single('avatar'), uploadFile);


module.exports = router;
