import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Form from './components/Form';
import FormList from './components/FormList';
import './App.css';

function App() {
  const [forms, setForms] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/forms')
      .then(response => {
        setForms(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the forms!", error);
      });
  }, []);

  const handleFormSubmit = async (formData) => {
    try {
      const response = await axios.post('http://localhost:5000/api/forms', formData);
      setForms([...forms, response.data]);
    } catch (error) {
      console.error("There was an error submitting the form!", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/forms/${id}`);
      setForms(forms.filter(form => form._id !== id));
    } catch (error) {
      console.error("There was an error deleting the form!", error);
    }
  };

  return (
    <div className="App">
      <h1>Form Submissions</h1>
      <Form onSubmit={handleFormSubmit} />
      <h2>Contact List</h2>
      <FormList forms={forms} onDelete={handleDelete} />
    </div>
  );
}

export default App;
