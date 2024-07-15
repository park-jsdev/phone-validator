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
                    writeFile file: 'mern-app/backend/.env', text: """PORT=${env.BACKEND_PORT}
                    MONGO_URI=${env.MONGO_URI}
                    FRONTEND_URL=${env.FRONTEND_URL}
                    NUMVERIFY_API_KEY=${env.NUMVERIFY_API_KEY}"""

                    // Create frontend .env file
                    writeFile file: 'mern-app/frontend/.env', text: """REACT_APP_BACKEND_URL=${env.REACT_APP_BACKEND_URL}"""
                }
            }
        }
        stage('Build and Deploy with Docker Compose') {
            steps {
                script {
                    sh 'cd mern-app && docker-compose down'
                    sh 'cd mern-app && docker-compose up -d --build'
                }
            }
        }
    }
}
