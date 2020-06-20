export default {
    database: {
        MONGODB_CONNECTION_STRING: process.env["MONGODB_CONNECTION_STRING"],
        //MONGODB_CONNECTION_STRING: 'mongodb://admin:admin@localhost:27017/shoppingList?authSource=admin'    
    },
    app: {
        PORT: 4000
    }
}