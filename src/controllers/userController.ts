import { Router, Request, Response } from 'express';
import { Book } from '../Book' ;
import { Catalogue } from '../Catalogue';
import { User } from '../User';

class UserController {
    router: Router;

    constructor() {
        this.router = Router();
        this.router.get('/:id', this.getUser.bind(this));

        this.router.post('/', this.createUser.bind(this));
    }

    
    getUser(req: Request, res: Response) {
        try {
            let result = User.parseUserList("select * from Bookish.dbo.BOOK");
            return res.json({ success: true, data: result });
        } catch {
            return res.status(500).json({
                error: 'server_error',
                error_description: 'Endpoint not implemented yet.',
            });
        }
    }

    createUser(req: Request, res: Response) {
         // TODO: implement functionality
        return res.status(500).json({
            error: 'server_error',
            error_description: 'Endpoint not implemented yet.',
        });
    }

}

export default new UserController().router;
