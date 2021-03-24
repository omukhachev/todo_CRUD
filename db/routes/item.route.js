const express = require('express');
const router = express.Router();
const item_controller = require('../controllers/item.controller');

router.post('/create', item_controller.item_create);
router.get('/:user_id', item_controller.item_get_data);
router.put('/update/:key', item_controller.item_update);
router.put('/update', item_controller.item_update_all);
router.delete('/delete/:key', item_controller.item_delete);
router.delete('/delete', item_controller.item_delete_checked);

module.exports = router;