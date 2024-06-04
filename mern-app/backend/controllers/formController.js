const axios = require('axios');
const Form = require('../models/Form');

// Validate phone number using the NumVerify API
const validatePhoneNumber = async (phone) => {
  try {
    const response = await axios.get(`http://apilayer.net/api/validate?access_key=${process.env.NUMVERIFY_API_KEY}&number=${phone}`);
    return response.data.valid;
  } catch (error) {
    console.error('Error validating phone number:', error);
    return false;
  }
};

// Create a new form
const createForm = async (req, res) => {
  const { name, email, phone, group } = req.body;
  const isValid = await validatePhoneNumber(phone);
  const newForm = new Form({ name, email, phone, isValid, group });
  try {
    const savedForm = await newForm.save();
    res.status(201).json(savedForm);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get a form by ID
const getFormById = async (req, res) => {
  try {
    const form = await Form.findById(req.params.id);
    if (form) {
      res.json(form);
    } else {
      res.status(404).json({ message: 'Form not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all forms
const getAllForms = async (req, res) => {
  try {
    const forms = await Form.find({});
    res.json(forms);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update a form by ID
const updateForm = async (req, res) => {
  const { name, email, phone, group } = req.body;
  const isValid = await validatePhoneNumber(phone);
  try {
    const updatedForm = await Form.findByIdAndUpdate(
      req.params.id,
      { name, email, phone, isValid, group },
      { new: true }
    );
    if (updatedForm) {
      res.json(updatedForm);
    } else {
      res.status(404).json({ message: 'Form not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a form by ID
const deleteFormById = async (req, res) => {
  try {
    const form = await Form.findByIdAndDelete(req.params.id);
    if (form) {
      res.json({ message: 'Form deleted successfully' });
    } else {
      res.status(404).json({ message: 'Form not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { createForm, getFormById, getAllForms, updateForm, deleteFormById };
