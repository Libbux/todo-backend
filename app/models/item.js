var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ItemSchema = new Schema({
    done: Boolean,
    content: String,
});

module.exports = mongoose.model('Item', ItemSchema);
