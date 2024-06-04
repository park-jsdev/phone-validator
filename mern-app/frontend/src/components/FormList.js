import React from 'react';
import { CSVLink } from 'react-csv';

const FormList = ({ forms, onDelete }) => {
  const headers = [
    { label: "Name", key: "name" },
    { label: "Email", key: "email" },
    { label: "Phone", key: "phone" },
    { label: "Group", key: "group" },
    { label: "Valid", key: "isValid" }
  ];

  return (
    <div>
      <CSVLink data={forms} headers={headers} filename="contacts.csv">Export to CSV</CSVLink>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Group</th>
            <th>Valid</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {forms.map(form => (
            <tr key={form._id}>
              <td>{form.name}</td>
              <td>{form.email}</td>
              <td>{form.phone}</td>
              <td>{form.group}</td>
              <td>{form.isValid ? 'Yes' : 'No'}</td>
              <td>
                <button onClick={() => onDelete(form._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FormList;
