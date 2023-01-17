const Role = require('./model');

const getRole = async (req, res) => {
  try {
    const roles = await Role.findAll({
      attributes: ['id', 'name', 'createdAt', 'updatedAt'],
    });
    res.json(roles);
  } catch (error) {
    res.status(400).send(error);
  }
};

const inputRole = async (req, res) => {
  console.log(req.body)
  const { id, name } = req.body;
  try {
    const create = await Role.create({
      name,
    });
    res.json({ data: create, msg: "yeay role's in" });
  } catch (error) {
    if (id === Role.id) {
      res.status(400).send(error);
    }
  }
};

const deleteRoles = async (req, res) => {
  await Promise.all(
    req.body.data.payload.map(async (payload) => {
      await Role.destroy({
        where: {
          id: payload.id,
        },
      });
    }),
  );
  return res.json(req.body.data.payload);
};

const editRoles = async (req, res) => {
  const role = await Role.findOne({
    attributes: [
      'id',
      'name',
    ],
    where: {
      id: req.params.id,
    },
  });
  role.name = req.body.name;

  const save = await role.save();
  res.status(200).json(save);
};

module.exports = {
  getRole, inputRole, deleteRoles, editRoles,
};
