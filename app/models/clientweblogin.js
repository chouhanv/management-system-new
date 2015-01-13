module.exports = (function () {

    var mongoose = require('mongoose')
        , Schema = mongoose.Schema
        , SchemaTypes = mongoose.Schema.Types
         , contacts = require('./contacts');
    var connection = mongoose.createConnection("104.207.132.73:27017/managementsystem");

    var clientwebloginSchema = new Schema ({

        contact : {
            type: Schema.Types.ObjectId, 
            ref: 'contacts'
        },
        
        email : {
            type:String
        },
        password:   {
            type:String
        }, 
        is_enabled:{
            type : Boolean,
            default : false
        }
  });
     return mongoose.model('clientweblogin', clientwebloginSchema);

}());