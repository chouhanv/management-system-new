module.exports = (function () {

    var mongoose = require('mongoose')
        , Schema = mongoose.Schema
        , SchemaTypes = mongoose.Schema.Types
        , categories = require('./categories')
        , clientweblogin = require('./clientweblogin');
    var connection = mongoose.createConnection("localhost:27017/reamm");

    var contactsSchema = new Schema ({

        category_id : {
            type: Schema.Types.ObjectId, 
            ref: 'categories'
        },
        clientweblogin: {
            type: Schema.Types.ObjectId, 
            ref: 'clientweblogin'
        },

        name :{},
        company :{},
        addreses :[],
        phones:[],
        emails :[],
        refferedbys :[],
        notes :[],
        additionalfields :[],
        imageSrc:{
            type:String
        },
        prospective_client:{
            type:Boolean,
            default:""
        },
        assistantname:{},
        accountname:{},
        status : {
            type : String,
            default :  10
        },
        date : {
            type : String,
            default : new Date()
        },
        is_deleted:{
            type:Boolean,
            default:false
        }
    });

    return mongoose.model('contacts', contactsSchema);

}());