pipeline {
    agent any

    environment {
        REGISTRY = "parkjsdev3232"
    }

    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'main', url: 'https://github.com/park-jsdev/phone-validator'
            }
        }
        stage('Build and Push Docker Images') {
            steps {
                script {
                    docker.withRegistry('', 'docker-hub-credentials') {
                        def frontendImage = docker.build("${env.REGISTRY}/frontend:latest", "./frontend")
                        def backendImage = docker.build("${env.REGISTRY}/backend:latest", "./backend")
                        frontendImage.push()
                        backendImage.push()
                    }
                }
            }
        }
        stage('Deploy with Docker Compose') {
            steps {
                script {
                    withCredentials([string(credentialsId: 'numverify-api-key', variable: 'NUMVERIFY_API_KEY')]) {
                        sh 'docker-compose down'
                        sh 'NUMVERIFY_API_KEY=$NUMVERIFY_API_KEY docker-compose up -d'
                    }
                }
            }
        }
    }
}
