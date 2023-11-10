```bash
npx create-react-app calendar --template typescript

```

```bash
cd calendar
```

```bash
npm run build

```

```bash
 docker build -t calendar .

```

```bash
docker run -p 8080:80 calendar
```

```bash
docker run -v ${PWD}:/app -p 8080:80 calendar
```

```bash

```


Promts

I want to run my frontend application in docker
The application is written in React Typescript

I want to use nginx to distribute static files

Tell me how to do this?


Sure, here is a step-by-step plan:
Create a Dockerfile in your project root.
Use a Node base image to build your React application.
Copy your project files into the Docker image and install dependencies.
Build the React application.
Use a Nginx base image.
Copy the build output from the Node image to the Nginx image.
Configure Nginx to serve your static files and forward API requests.
Expose the Nginx server port.
Here is the Dockerfile code:

# Stage 1: Build react application
FROM node:14 as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve app with nginx server
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

To build and run the Docker image, use the following commands:

docker build -t my-react-app .
docker run -p 8080:80 my-react-app

In this case, your application will be available at http://localhost:8080.


# Stage 1: Build react application
FROM node:14 as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve app with nginx server
FROM nginx:alpine
#COPY --from=build /build /usr/share/nginx/html
COPY ./build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

