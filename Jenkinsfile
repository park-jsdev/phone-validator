pipeline {
    agent any

    environment {
        NUMVERIFY_API_KEY = credentials('numverify-api-key')
        BACKEND_PORT = '5000'
        MONGO_URI = 'mongodb://mongo:27017/formDB'
        FRONTEND_URL = 'http://3.17.56.99:3000'
        REACT_APP_BACKEND_URL = 'http://3.17.56.99:5000/api/contacts'
    }

    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'main', url: 'https://github.com/park-jsdev/phone-validator'
            }
        }
        stage('Create .env Files') {
            steps {
                script {
                    // Create backend .env file
                    try {
                        writeFile file: 'mern-app/backend/.env', text: """PORT=${env.BACKEND_PORT}
MONGO_URI=${env.MONGO_URI}
FRONTEND_URL=${env.FRONTEND_URL}
NUMVERIFY_API_KEY=${env.NUMVERIFY_API_KEY}"""
                        echo 'Backend .env file created successfully.'
                    } catch (Exception e) {
                        echo "Failed to create backend .env file: ${e}"
                    }

                    // Create frontend .env file
                    try {
                        writeFile file: 'mern-app/frontend/.env', text: """REACT_APP_BACKEND_URL=${env.REACT_APP_BACKEND_URL}"""
                        echo 'Frontend .env file created successfully.'
                    } catch (Exception e) {
                        echo "Failed to create frontend .env file: ${e}"
                    }

                    // Debug: List files to ensure .env files are created
                    sh 'ls -l mern-app/backend'
                    sh 'ls -l mern-app/frontend'
                }
            }
        }
        stage('Build and Deploy with Docker Compose') {
            steps {
                script {
                    try {
                        sh 'cd mern-app && docker-compose down'
                        sh 'cd mern-app && docker-compose up -d --build'
                        echo 'Docker Compose executed successfully.'
                    } catch (Exception e) {
                        echo "Docker Compose execution failed: ${e}"
                    }
                }
            }
        }
    }
}
