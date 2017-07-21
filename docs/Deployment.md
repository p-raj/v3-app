# Deployment (using Docker)

### Steps

 - Create a production bundle using 
    
        npm run build

 - Create the docker image

        docker build . -t praj/noapp-client:$VERSION

 - Test the docker image

        docker run -p 80:80 praj/noapp-client:$VERSION

 - Push the docker image

        docker push praj/noapp-client:$VERSION
