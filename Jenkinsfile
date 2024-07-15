pipeline {
    agent any

    environment {
        NUMVERIFY_API_KEY = credentials('numverify-api-key')
    }

    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'main', url: 'https://github.com/park-jsdev/phone-validator'
            }
        }
        stage('Build and Deploy with Docker Compose') {
            steps {
                script {
                    sh 'docker-compose down'
                    sh '''
                    NUMVERIFY_API_KEY=$NUMVERIFY_API_KEY docker-compose up -d --build
                    '''
                }
            }
        }
    }
}
