# Getting Started with Breaking Yous App Dockerized into ec2 instance. 
Dockerfile is present in the repository. 

# Local startup
## If you want to just run it locally with a docker image, these are the commands:
docker build -t breaking-youse . <br>
docker run -p 3000:3000 breaking-youse

## EC2 Hosting
# If you have an ec2 instance and would like to host it there, in your local repo:
docker build -t breaking-youse .  <br>
docker save -o breaking-youse.tar breaking-youse <br>
From here, you have to copy the tar file from local (or wherever you have ur repo) to the ec2 instance. Either scp or sftp works. 

# In your ec2 instance:
## Make sure you install docker.
## If docker and prettier is not installed:
sudo yum install docker -y <br>
sudo yum install prettier -y <br>
## Else:
docker load -i breaking-youse.tar (you might need to sudo to bypass)

## After loading the Docker image, you can use the docker images command to verify that the image is available on the EC2 instance:
docker images

## Now you can start up and run the container using this image
sudo docker run -d -p 80:3000 breaking-youse

## To stop it, find the container ID with 
sudo docker ps 
## Then stop with 
sudo docker stop [680b35fbee17] 
