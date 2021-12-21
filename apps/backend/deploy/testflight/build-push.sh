export DOCKER_IMAGE="soundverse-main-api-testflight:latest"
docker build -t 856703066968.dkr.ecr.eu-central-1.amazonaws.com/$DOCKER_IMAGE -f ./apps/backend/Dockerfile .
docker push 856703066968.dkr.ecr.eu-central-1.amazonaws.com/$DOCKER_IMAGE
