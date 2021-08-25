const express = require('express');
const router = express.Router();
const item_controller = require('../controllers/item.controller');

router.post('/create', item_controller.item_create);
router.post('/:user_id', item_controller.item_get_data);
router.post('/update/user/:key', item_controller.item_update);
router.post('/update/user', item_controller.item_update_all);
router.post('/delete/user/:key', item_controller.item_delete);
router.post('/delete/user', item_controller.item_delete_checked);

module.exports = router;