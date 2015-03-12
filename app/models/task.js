module.exports = (function () {
   var mongoose = require('mongoose')
    , Schema = mongoose.Schema
    , SchemaTypes = mongoose.Schema.Types;    

    var taskSchema = new Schema({
        task:{
            type:String
        },
        createdBy:{
            type:String
        },
        status:{
            type:Number,
            default:0
        },
        date:{
            type : String,
            default: new Date()
        }
    }, {strict: false});
    return mongoose.model('task', taskSchema,'task');
}());