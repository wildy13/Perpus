const {
    User, Role,
  } = require('./relations');
  
  const getUser = async (req, res) => {
    try {
      const user = await User.findAll({
        attributes: [
          'id',
          'username',
          'email',
          'roleId',
          'nisn',
          'image'
        ],
        include: [{
          model: Role,
          attributes: ['name'],
        },
        ],
      });
      res.status(200).json(user);
    } catch (error) {
      res.status(500).send(error);
    }
  };
  
  const getMe = async (req, res) => {
    try {
      const user = await User.findOne({
        attributes: [
          'id',
          'username',
          'email',
          'roleId',
          'nisn',
          'image'
        ],
        where: { username: req.auth.username },
      });
      res.status(200).json({ user });
    } catch (err) {
      res.status(500).send(err);
    }
  };
  
  const createUser = async (req, res) => {
    const {
      username,
      email,
      password,
      confPassword,
      nisn,
      image,
      roleId,
    } = req.body;
    try {
      const newUser = new User({
        username,
        email,
        password,
        confPassword,
        nisn,
        image,
        roleId,
      });
      const user = await newUser.save();
  
      res.status(200).json(user);
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        res.status(400).send(error.errors[0].message);
      } else {
        res.status(500).send(error);
      }
    }
  };
  
  const deleteUsers = async (req, res) => {
    await Promise.all(
      req.body.data.payload.map(async (payload) => {
        await User.destroy({
          where: { id: payload.id },
        });
      }),
    );
    return res.json(req.body.data.payload);
  };
  
  const editUsers = async (req, res) => {
    const user = await User.findOne({
      attributes: [
        'id',
        'username',
        'email',
        'roleId',
        'nisn',
        'image'
      ],
      where: {
        id: req.params.id,
      },
    });
    user.username = req.body.username;
    user.email = req.body.email;
    user.roleId = req.body.roleId;
    user.nisn = req.body.nisn;
    user.image = req.body.image;
  
    const save = await user.save();
    res.status(200).json(save);
  };
  
  const changePassword = async (req, res) => {
    const { oldPass, newPass } = req.body;
  
    const user = await User.findOne({
      attributes: [
        'id',
        'password',
      ],
      where: {
        id: req.params.id,
      },
    });
  
    const checkPassword = await user.authenticate(oldPass);
  
    if (checkPassword) {
      user.password = newPass;
      await user.save();
  
      res.status(200).json(user);
    } else {
      res.status(400).send('Your old password in invalid, please try again');
    }
  };

  const uploadFile = async (req, res) => {
    const { originalname } =req. file
    const ext = originalname.substring(originalname.lastIndexOf('.')+1, originalname.length) || originalname

    const user = await User.findOne({
      attributes: [
        'id',
        'image'
      ],
      where: {
        id: req.body.id,
      },
    });

    user.image = `${req.body.username}.${ext}`;
  
    const save = await user.save();
    res.status(200).json(save);
  };
  
  module.exports = {
    getUser,
    getMe,
    createUser,
    deleteUsers,
    editUsers,
    changePassword,
    uploadFile,
  };
  