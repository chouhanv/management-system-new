module.exports = (function () {

    var mongoose = require('mongoose')
        , Schema = mongoose.Schema
        , SchemaTypes = mongoose.Schema.Types
        ;
    var connection = mongoose.createConnection("104.207.132.73:27017/managementsystem");

    var documentsSchema = new Schema({}, {strict: false});

    return mongoose.model('documents', documentsSchema,'documents');

}());