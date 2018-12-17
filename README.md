Preliminary react-babylon.js framework

---

# Setup github pages
Set the basename to the first part of the URL where you are hosting it "https://jtmckay.github.io/TQL_V/"
<BrowserRouter basename='/TQL_V'>

Set the homepage in package.json
"homepage": "https://jtmckay.github.io/TQL_V/"

Setup gh-pages scripts in package.json:
"predeploy": "npm run build",
"deploy": "gh-pages -d build"

With gh-pages installed either globally or locally simply run:
npm run deploy

---
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`
