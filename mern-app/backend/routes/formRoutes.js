const express = require('express');
const router = express.Router();
const { createOrUpdateForm, deleteForm, getFormById, getAllForms } = require('../controllers/formController');

router.route('/').post(createOrUpdateForm).get(getAllForms);
router.route('/:id').get(getFormById).delete(deleteForm);

module.exports = router;
