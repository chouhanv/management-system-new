module.exports = (function () {

   var mongoose = require('mongoose')
    , Schema = mongoose.Schema
    , SchemaTypes = mongoose.Schema.Types
    ;
    var connection = mongoose.createConnection("mongodb://localhost/managementsystem");

    var adminUsersSchema = new Schema({
        first_name : {
            type:String
        },
        last_name : {
            type:String
        },
        user_type : {
            type:String
        },
        email : {
            type:String
            required:true
        },
        password : {
            type:String,
            required:true
        },
        is_deleted:{
            type : Boolean,
            default : false
        }
    }, {strict: false});
    return mongoose.model('adminusers', adminUsersSchema,'adminusers');
}());