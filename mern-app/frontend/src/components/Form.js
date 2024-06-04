import React, { useState } from 'react';
import axios from 'axios';

const Form = ({ onSubmit, initialData }) => {
  const [formData, setFormData] = useState(initialData || {
    name: '',
    email: '',
    phone: '',
    group: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onSubmit(formData);
    } catch (error) {
      console.error("There was an error submitting the form!", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
      <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
      <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" required />
      <input type="text" name="group" value={formData.group} onChange={handleChange} placeholder="Group" />
      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;
