# Welcome to BigNumber-Calculator

BNCalculator is an improved calculator application using arbitrary-precision arithmetic data structure, also known as Big-Number. This comes with a bunch of algorithms which allows you to process much greater numbers than can be stored in primitive data types of the most programming languages.


## Environment

The application is separated into two parts; back-end and front-end. Using an UI you can use some buttons to make an expression. Application make some process and then represents the result. Application can do two types of calculations; arithmetic stuff and binomial integration.
> 1. Arithmetic: UI asks from an API in back-end to get the result.
> 2. Binomial Integration: UI solve the expression itself.

## Installation

The app is not built completely yet, so it's preferred to run it using terminal.
You need NodeJS and a C++ Compiler to use this app.
### Back-End
Enter these commands respectively in the terminal.

Change directory to backend
`cd backend`

install the dependencies:
`npm install`

run the server: 
`npm start`

### Front-End
After doing so, open another shell in order to run the web-pack server which renders the React UI:

Change directory to frontend
`cd frontend`

install the dependencies:
`npm install`

run the server: 
`npm run electron-dev`

> Ignore the browser tab opening and wait for Electron to load up the desktop app.

## API Request Visualization

![enter image description here](https://i.ibb.co/yngD775/photo-2020-10-02-17-50-08.jpg)
```
