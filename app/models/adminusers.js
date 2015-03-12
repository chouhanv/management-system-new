module.exports = (function () {

   var mongoose = require('mongoose')
    , Schema = mongoose.Schema
    , SchemaTypes = mongoose.Schema.Types
    ;
    var connection = mongoose.createConnection("localhost:27017/reamm");

    var adminUsersSchema = new Schema({
        first_name : {
            type:String
        },
        last_name : {
            type:String
        },
        user_type : {
            type:String,
            default:"admin"
        },
        email : {
            type:String,
            required:true
        },
        password : {
            type:String,
            required:true
        },
        is_active:{
            type : String,
            default : "Inactive"
        },
        role : {
            type:"String"
        },
        imageSrc:{
            type:String
        },
        is_deleted:{
            type:Boolean,
            default:false
        },
        date : {
            type : String,
            default: new Date()
        }
    }, {strict: false});
    return mongoose.model('adminusers', adminUsersSchema,'adminusers');
}());