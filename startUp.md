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


//reference
// query_id=AAEM760hAAAAAAzvrSEARQWe&user=%7B%22id%22%3A565047052%2C%22first_name%22%3A%22Yury%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22Yury_Gurian%22%2C%22language_code%22%3A%22en%22%2C%22allows_write_to_pm%22%3Atrue%7D&auth_date=1699713413&hash=7b9bd0d6adbf4ddb2101728938a63f2a49fac26382dd2fd6b8c1bee5f5561877
// const params = new URLSearchParams('query_id=AAEM760hAAAAAAzvrSEARQWe&user=%7B%22id%22%3A565047052%2C%22first_name%22%3A%22Yury%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22Yury_Gurian%22%2C%22language_code%22%3A%22en%22%2C%22allows_write_to_pm%22%3Atrue%7D&auth_date=1699713413&hash=7b9bd0d6adbf4ddb2101728938a63f2a49fac26382dd2fd6b8c1bee5f5561877');
// console.log(queryId); // AAEM760hAAAAAAzvrSEARQWe
// console.log(user); // {id: 565047052, first_name: "Yury", last_name: "", username: "Yury_Gurian", language_code: "en", allows_write_to_pm: true}
// console.log(authDate); // 1699713413
// console.log(hash); // 7b9bd0d6adbf4ddb2101728938a63f2a49fac26382dd2fd6b8c1bee5f5561877
//

