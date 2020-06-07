const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

module.exports = app;

/* Do not change the following line! It is required for testing and allowing
*  the frontend application to interact as planned with the api server
*/
const PORT = process.env.PORT || 4001;

// Middleware for handling CORS requests from index.html
app.use(cors());

// Middware for parsing request bodies
app.use(bodyParser.json());

// Mount your existing apiRouter below at the '/api' path.
const apiRouter = require('./server/api');
app.use('/api', apiRouter);

// This conditional is here for testing purposes:
if (!module.parent) { 
  // Start the server listening at PORT below:
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  })
}
