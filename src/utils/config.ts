export default {
    database: {
        //MONGODB_CONNECTION_STRING: 'mongodb://' + process.env["MONGODB_USERNAME"] + ':' + process.env["MONGODB_PASSWORD"] + '@mongodb:27017/admin',
        MONGODB_CONNECTION_STRING: 'mongodb://admin:admin@localhost:27017/shoppingList?authSource=admin'    },
    app: {
        PORT: 4000
    }
}