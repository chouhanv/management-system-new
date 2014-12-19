module.exports = (function () {

    var mongoose = require('mongoose')
        , Schema = mongoose.Schema
        , SchemaTypes = mongoose.Schema.Types
        ;
    var connection = mongoose.createConnection("mongodb://localhost/managementsystem");

    var categoriesSchema = new Schema ({

        categorie : {
            type : String,
            require :  true
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

    return mongoose.model('categories', categoriesSchema);

}());