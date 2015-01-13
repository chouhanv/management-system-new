module.exports = (function () {

   var mongoose = require('mongoose')
    , Schema = mongoose.Schema
    , SchemaTypes = mongoose.Schema.Types
    ;
    var connection = mongoose.createConnection("104.207.132.73:27017/managementsystem");

    var taskSchema = new Schema({
        title:{
            type:String
        },
        description:{
            type:String
        },
        priority:{
            type:String
        },
        assignedTo:{
            type:String
        },
        createdBy:{
            type:String
        },
        is_deleted:{
            type:Boolean,
            default:false
        },
        date:{
            type : String,
            default: new Date()
        }
    }, {strict: false});
    return mongoose.model('task', taskSchema,'task');
}());