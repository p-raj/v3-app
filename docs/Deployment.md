# WEB


### Deployment (using Docker)

#### Steps

 - Create a production bundle using 
    
        npm run build

 - Create the docker image

        docker build . -t praj/noapp-client:$VERSION

 - Test the docker image

        docker run -p 80:80 praj/noapp-client:$VERSION

 - Push the docker image

        docker push praj/noapp-client:$VERSION

# iOS

- Go to XCode, change the scheme to Release.
- Next, bump up the app version
- Archive the app
- Go to organizer and validate the app bundle
- Push the app to iTunes Connect


# Android
