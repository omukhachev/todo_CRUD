const express = require('express');
const router = express.Router();
const item_controller = require('../controllers/item.controller');

router.post('/create', item_controller.item_create);
router.get('/:id', item_controller.item_get_data);
router.put('/update/:id', item_controller.item_update);
router.delete('/delete/:id', item_controller.item_delete);

module.exports = router;