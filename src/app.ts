import express from 'express';
import 'dotenv/config';

import healthcheckRoutes from './controllers/healthcheckController';
import bookRoutes from './controllers/bookController';

const port = process.env['PORT'] || 3000;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});

/**
 * Primary app routes.
 */
app.use('/healthcheck', healthcheckRoutes);
app.use('/books', bookRoutes);


// eslint-disable-next-line @typescript-eslint/no-var-requires
const Connection = require('tedious').Connection;

const config = {
    server: 'localhost',
    options: {
        trustServerCertificate: true
    },
    authentication: {
        type: 'default',
        options: {
            userName: 'Leonard',
            password: '536635',
        },
    },
};

const connection = new Connection(config);

connection.on('connect', function (err: Error) {
    if (err) {
        console.log(err);
    }
    executeStatement();
});

connection.connect();



var Request = require('tedious').Request;
function executeStatement() {
    let request = new Request("select * from Bookish.dbo.AUTHOR", function(err, rowCount) {
      if (err) {
        console.log(err);
      } else {
        console.log(rowCount + ' rows');
        // and we close the connection
        connection.close()
      }
    });

    request.on('row', function(columns) {
      columns.forEach(function(column) {
        console.log(column.value);
      });
    });

    connection.execSql(request);
  }

// connection.