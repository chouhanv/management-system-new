module.exports = (function () {

    var mongoose = require('mongoose')
        , Schema = mongoose.Schema
        , SchemaTypes = mongoose.Schema.Types
        , contacts = require('./contacts');

    var connection = mongoose.createConnection("104.207.132.73:27017/managementsystem");

    var mattersSchema = new Schema({
        is_deleted:{
            type : Boolean,
            default : false
        },

        parties : {
            sellers : [ 
                {
                    type: Schema.Types.ObjectId, 
                    ref: 'contacts'
                }
            ],
            sellers_attorney : [ 
                {
                    type: Schema.Types.ObjectId, 
                    ref: 'contacts'
                }
            ],
            sellers_agent : [ 
                {
                    type: Schema.Types.ObjectId, 
                    ref: 'contacts'
                }
            ],
            buyers : [ 
                {
                    type: Schema.Types.ObjectId, 
                    ref: 'contacts'
                }
            ],
            buyers_attorney : [ 
               {
                    type: Schema.Types.ObjectId, 
                    ref: 'contacts'
                }
            ],
            buyers_agent : [ 
                {
                    type: Schema.Types.ObjectId, 
                    ref: 'contacts'
                }
            ],
            lender_attorney : {
                type: Schema.Types.ObjectId, 
                ref: 'contacts'
            },
            lender_agent : {
                type: Schema.Types.ObjectId, 
                ref: 'contacts'
            },
            surveyor : {
                type: Schema.Types.ObjectId, 
                ref: 'contacts'
            },
            past_inspector : {
                type: Schema.Types.ObjectId, 
                ref: 'contacts'
            },
            building_inspector : {
                type: Schema.Types.ObjectId, 
                ref: 'contacts'
            },
            additionalfields : [
                {
                    type: Schema.Types.ObjectId, 
                    ref: 'contacts'
                }
            ],
            title_company : {
                type: Schema.Types.ObjectId, 
                ref: 'contacts'
            },
            title_search : {
                type: Schema.Types.ObjectId, 
                ref: 'contacts'
            },
            under_writer :{
                type: Schema.Types.ObjectId, 
                ref: 'contacts'
            },
            closer : {
                type: Schema.Types.ObjectId, 
                ref: 'contacts'
            },
            recording_office : {
                type: Schema.Types.ObjectId, 
                ref: 'contacts'
            },
            abstract_search : {
                type: Schema.Types.ObjectId, 
                ref: 'contacts'
            },
            // additionalfields : [{
            //     type: Schema.Types.ObjectId, 
            //     ref: 'contacts'
            // }]
        }

    }, {strict: false});

    return mongoose.model('matters', mattersSchema,'matters');
}());