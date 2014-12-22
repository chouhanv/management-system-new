module.exports = (function () {

    var mongoose = require('mongoose')
        , Schema = mongoose.Schema
        , SchemaTypes = mongoose.Schema.Types
        , categories = require('./categories');
    var connection = mongoose.createConnection("mongodb://localhost/managementsystem");

    var contactsSchema = new Schema ({

        category_id : {
            type: Schema.Types.ObjectId, 
            ref: 'categories'
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
            default:false
        },
        status : {
            type : String,
            default :  10
        },
        date : {
            type : String,
            default : new Date()
        }
    });

    return mongoose.model('contacts', contactsSchema);

}());