import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import userRoutes  from './routes/user.routes';
import shoppingListRoutes  from './routes/shoppingList.routes';
import config from './utils/config';

class Server {
    public app: express.Application;
    
    constructor() {
        this.app = express();
    }

    private config() {
        this.app.set('port', config.app.PORT);
        this.app.use(bodyParser.json());
        this.app.set('jwt-secret', 'shoppingListApplicationToken');
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: false}));
    }

    private initializeRoutes() {
        this.app.use('/', userRoutes);
        this.app.use('/user', userRoutes);
        this.app.use('/shopping_list', shoppingListRoutes);
    }

    private DBConnect() {
        const connection = mongoose.connection;

        connection.on("connected", () => {
          console.log("MongoDB connection CREATED");
        });

        connection.on("error", (error: Error) => {
          console.log("MongoDB connection ERROR: " + error);
        });
    
        const run = async () => {
          await mongoose.connect((config.database.MONGODB_CONNECTION_STRING), {
            keepAlive: true, useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true
          });
        };
        run().catch(error => console.error(error));
      }

    public start() {
        this.config();
        this.app.listen(this.app.get('port'), () => {
        console.log('Server is listening on port ' + this.app.get('port'));
        });
        this.initializeRoutes();
        this.DBConnect();
    }
}

const server = new Server();
server.start();
module.exports = server.app;
