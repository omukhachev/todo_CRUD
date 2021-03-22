const express = require('express');
const router = express.Router();
const user_controller = require('../controllers/user.controller');

router.get('/test', user_controller.test);
router.post('/create', user_controller.user_create);
router.get('/:id', user_controller.user_get_data);
router.put('/:id/update', user_controller.user_update);
router.delete('/:id/delete', user_controller.user_delete);

module.exports = router;
