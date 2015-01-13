module.exports = (function () {

       var mongoose = require('mongoose')
        , Schema = mongoose.Schema
        , SchemaTypes = mongoose.Schema.Types
        ;
        ;
    var connection = mongoose.createConnection("104.207.132.73:27017/managementsystem");

    var schedulesSchema = new Schema({
        is_deleted:{
            type : Boolean,
            default : false
        },
        is_ignored:{
            type:Boolean,
            default:false
        }
    }, {strict: false});
    return mongoose.model('schedules', schedulesSchema,'schedules');
}());