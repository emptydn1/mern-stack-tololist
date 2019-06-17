var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Todo = new Schema({
    description: {
        type: String
    },
    responsible: {
        type: String
    },
    priority: {
        type: String
    },
    status: {
        type: String
    },
    preStatus: {
        type: String
    },
    startDate: {
        type: Date,
        default: Date.now
    },
    endDate: {
        type: Date
    },
    completed: {
        type: Boolean
    }
}, { collection: 'todo' });

module.exports = mongoose.model('Todo', Todo);