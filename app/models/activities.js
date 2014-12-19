module.exports = (function () {

    var mongoose = require('mongoose')
        , Schema = mongoose.Schema
        , SchemaTypes = mongoose.Schema.Types
        ;
    var connection = mongoose.createConnection("mongodb://localhost/managementsystem");

    var activitiesSchema = new Schema({}, {strict: false});

    return mongoose.model('activities', activitiesSchema,'activities');

}());