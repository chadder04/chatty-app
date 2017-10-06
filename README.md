Chatty App
=====================

A single page app that uses React, a popular front-end library created and used heavily by Facebook as well as modern tools for Node including Webpack and Babel for multi-user real-time updates. No persistent database is involved in this app; the focus is on the client-side experience.

### Final Product

![Chatty App 1](https://github.com/chadder04/chatty-app/blob/master/docs/chatty-app-1.png)

![Chatty App 2](https://github.com/chadder04/chatty-app/blob/master/docs/chatty-app-2.png)

### Usage

Clone this repository. 

Install the dependencies for chatty client.

```
cd client
npm install
```

Install the dependencies for chatty server.
```
cd ..
cd server
npm install
```

Start both chatty client and chatty server in separate terminals by running `npm start`

```
open http://localhost:3000
```


### Dependencies

* express
* uuid
* ws
* react
* react-dom

### Developer Dependencies

* webpack
* webpack-dev-server
* babel-core
* babel-loader
* babel-preset-es2015
* babel-preset-react
* babel-preset-stage-0
* css-loader
* eslint
* eslint-plugin-react
* node-sass
* sass-loader
* sockjs-client
* style-loader

