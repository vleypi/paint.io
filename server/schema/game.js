const {model,Schema,Types} = require('mongoose')
const shortid = require('shortid')

const schema = new Schema({
    users:{
        type: Array,
        default: [{
            name: {type: String, required: true},
            id: {type: String, required: true},
            draw: {type: Boolean, default: false},
            author: {type: Boolean, default: false}
        }],
    },
    started: {
        type: Boolean,
        default: false
    },
    word: {
        type: String,
        
    }
})

module.exports = model('Game',schema)