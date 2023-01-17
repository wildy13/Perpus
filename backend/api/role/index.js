const { Router } = require('express');
const { isAdmin } = require('../auth/service');
const {
  getRole, inputRole, deleteRoles, editRoles,
} = require('./controller');

const router = new Router();

// Get Router
router.get('/', getRole);

// POST Router
router.post('/', inputRole);
router.post('/delete', deleteRoles);

// PUT Router
router.put('/:id', editRoles);

module.exports = router;
