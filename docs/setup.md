# Setup

## Local

To launch the Tuner application from a local machine, follow the steps below:

1. Locate the `menu.js` file in the `client` directory and change the global variable `url` to point to `http://localhost:3000` instead. Otherwise it will redirect you to the live web version.
2. Open a terminal and run `npm start` or `node server/index.js` from the top-most (tuner) directory to start the application
3. The application should now be live at <http://localhost:3000> in a browser
   - Note that the `port` number may be different if the `process.env.PORT` environment variable is set to something other than 3000

To close the Tuner application, simply exit the terminal used to start the app or input `CTRL` + `C` in the same terminal

## Web

To view the Tuner application on the web, simply navigate to <https://tuner-app.herokuapp.com/> with a browser.
