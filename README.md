# MERN Phone Validation App

## Overview

This is a MERN stack application that allows users to submit a form with their name, email, and phone number. The phone number is validated using the NumVerify API.

## API Endpoints

- **POST /api/contacts**: Takes in the form and stores it in the database. Returns the ID of the newly created form response.
- **GET /api/contacts**: Returns all responses to the form.
- **GET /api/contacts/:id**: Returns the form corresponding to the ID.
- **DELETE /api/contacts/:id**: Deletes the form corresponding to the ID.

### Making REST API calls directly to server

POST /api/contacts:

Purpose: Create a new form entry.   
Request Body: { "name": "John Doe", "email": "john@example.com", "phone": "1234567890" }   
Response: The ID of the newly created form entry.   

Example using curl:
```sh
curl -X POST -H "Content-Type: application/json" -d '{"name": "John Doe", "email": "john@example.com", "phone": "1234567890"}' http://13.59.148.177:5000/api/contacts
```

GET /api/contacts:

Purpose: Retrieve all form entries.
Response: An array of form entries.

Example using curl:

```curl
curl http://13.59.148.177:5000/api/contacts
```

GET /api/contacts/:id:

Purpose: Retrieve a form entry by its ID.
Response: The form entry corresponding to the specified ID.

Example using curl:

```curl
curl http://13.59.148.177:5000/api/contacts/{id}
```

## Running the Application

### Prerequisites

- Docker and Docker Compose installed.
- Jenkins installed and configured with access to your GitHub repository.
- The address is currently an AWS EC2 public IP address, so it can change. If you are working in your own fork, change the address appropriately.

### Instructions

1. Clone the repository:

```sh
git clone https://github.com/park-jsdev/phone-validator.git
cd phone-validator
```

2. Configure Jenkins to pull from your GitHub repository and set up the pipeline. Use the included Jenkinsfile.

3. Set up Jenkins credentials and add the NumVerify API key with the ID of 'numverify-api-key'.

4. Build and deploy the application using the Jenkins pipeline by manually triggering a build or pushing to the repository. You can create fork of this repository and change the GitHub repo that triggers the build. Set up a GitHub webhook in the repository.

5. Access the application:

Frontend: http://13.59.148.177:3000
Backend: http://13.59.148.177:5000/api/contacts

### Technologies Used

- MongoDB
- Express.js
- React.js
- Node.js
- Docker
- Jenkins
- NumVerify API
