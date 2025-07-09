import { Router, Request, Response } from 'express';

class BookController {
    router: Router;

    constructor() {
        this.router = Router();
        this.router.get('/:id', this.getBook.bind(this));

        this.router.post('/', this.createBook.bind(this));
    }

    getFromDB() {
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
        var Request = require('tedious').Request;
        function executeStatement() {
            let request = new Request("select * from Bookish.dbo.BOOK", function(err, rowCount) {
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
    }

    getBook(req: Request, res: Response) {
        // TODO: implement functionality
        return res.status(500).json({
            error: 'server_error',
            error_description: 'Endpoint not implemented yet.',
        });
    }

    createBook(req: Request, res: Response) {
        // TODO: implement functionality
        return res.status(500).json({
            error: 'server_error',
            error_description: 'Endpoint not implemented yet.',
        });
    }
}

export default new BookController().router;
