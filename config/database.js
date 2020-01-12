const MongoClient = require('mongodb').MongoClient;

module.exports = {
    database: 'mongodb://localhost:27017/meanauth',
    uri: 'mongodb+srv://admin:admin@development-nqz42.mongodb.net/meanauthapp?retryWrites=true&w=majority',
    secret: 'secretkey'
}