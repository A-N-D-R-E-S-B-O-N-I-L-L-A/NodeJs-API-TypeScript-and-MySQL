import express from 'express'
import userRouter from '../routes/user.routes';
import cors from 'cors';
import db from '../db/connection';


class Server {  

    private app: express.Application;
    private port: string;

    private apiServers = {
        users: '/api/user'
    }

    constructor(){
        
        this.app = express();
        this.port = process.env.PORT || '8000';

        // create a connection with the database in MySQL
        this.dbConnection();

        // Call the middlwares
        this.middlewares();

        // Define routes
        this.routes();

    }

    async dbConnection(){

        try {

            await db.authenticate();
            console.log('Database is connected')
            
        } catch (error:any) {

            throw new Error(error);

        }

    }

    middlewares(){

        // Cors
        this.app.use(cors())

        // Body Reading
        this.app.use( express.json() )

        // Public Files
        this.app.use(express.static('public'))

    }

    routes(){

        this.app.use(this.apiServers.users, userRouter)
    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log("listen in the port: ", this.port)
        })
    }

}

export default Server;