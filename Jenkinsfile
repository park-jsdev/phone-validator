pipeline {
    agent any

    environment {
        NUMVERIFY_API_KEY = credentials('numverify-api-key')
        BACKEND_PORT = '5000'
        MONGO_URI = 'mongodb://mongo:27017/formDB'
        FRONTEND_URL = 'http://13.59.148.177:3000'
        REACT_APP_BACKEND_URL = 'http://13.59.148.177:5000/api/contacts'
    }

    options {
        timeout(time: 2000, unit: 'MINUTES')
    }

    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'main', url: 'https://github.com/park-jsdev/phone-validator'
            }
        }
        stage('Create .env File') {
            steps {
                script {
                    writeFile file: '.env', text: """
                    PORT=${env.BACKEND_PORT}
                    MONGO_URI=${env.MONGO_URI}
                    FRONTEND_URL=${env.FRONTEND_URL}
                    REACT_APP_BACKEND_URL=${env.REACT_APP_BACKEND_URL}
                    NUMVERIFY_API_KEY=${env.NUMVERIFY_API_KEY}"""
                    echo '.env file created successfully.'
                }
            }
        }
        stage('Build and Deploy with Docker Compose') {
            steps {
                script {
                    sh 'docker-compose down'
                    sh 'docker-compose up -d --build'
                }
            }
        }
    }
}
