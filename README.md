### Docker

Make sure you have Docker installed, follow this [link](https://docs.docker.com/get-docker/) to get your installation package for Docker.

Once you have Docker run this command at the root of the repository to build the image
`docker-compose build`

Then run this command to run the containers
`docker-compose up`

When you are done testing, stop the server and remove the container.
`docker rm -f test`

### Running locally

Install NodeJS. Binaries are found on the NodeJS main site. https://nodejs.org/en/download/

Navigate to the api directory

With NodeJS install the dependencies of the project
`npm install`

Then start up the API server
`npm start`

Navigate to the web directory

With NodeJS install the dependencies of the project
`npm install`

Then run the app. Open http://localhost:3000 to view it in browser
`npm start`
