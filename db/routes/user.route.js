const express = require('express');
const router = express.Router();
const user_controller = require('../controllers/user.controller');

router.post('/create', user_controller.user_create);
router.get('/:id', user_controller.user_get_data);
router.put('/update/:id', user_controller.user_update);
router.delete('/delete/:id', user_controller.user_delete);

module.exports = router;
