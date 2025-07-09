import express from 'express';
import 'dotenv/config';
import { Book } from './Book' ;
import healthcheckRoutes from './controllers/healthcheckController';
import bookRoutes from './controllers/bookController';
import { constants } from 'perf_hooks';

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

async function your_function(){
  var id = 'id you want or user inputs';
  const allData = [];
  // We now set the promise awaiting it gets results
  await new Promise((resolve,reject) => {
      const request = new Request("select * from Bookish.dbo.All_BOOKS", function(err, rowCount) {
            if (err) {
                return reject(err);
            }
        });
        
        request.on('row', function(columns) {
            columns.forEach(function(column) {
                allData.push(column); //Push the result to array
            });
        });

        request.on('doneProc', function (rowCount, more, returnStatus, rows) {
            return resolve(allData); //Here we resolve allData using promise in order to get it´s content later
        });

        connection.execSql(request);

    });

    return allData;  // Now You can assign it or use the same object as well
}




const executeSQL = (sql, callback) => {
  let rowMetadata: string[] = [];
  let connection = new Connection({
    server: 'localhost',
    options: {
        trustServerCertificate: true
    },
    authentication: {
        type: 'default',
        options: {
            userName: 'Leonard',
            password: '536635',
            rowCollectionOnDone: true,
            rowCollectionOnRequestCompletion: true
        },
    },
});

};


const Connection = require('tedious').Connection;



const connection = new Connection(config);

connection.on('connect', function(err) {
  if (err) {
        console.log(err);
    }else{
        console.log("Connected");  
    }
})

connection.connect();


let Request = require('tedious').Request;




let allBooks: Book[] = [];



app.get('/', async (req, res) => {
    try {
      const result = await your_function();
      allBooks = Book.parseResultToBookList(result);
      // console.log(result);
      res.json({ success: true, data: allBooks });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: err.message });
    }
});