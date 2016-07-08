var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

var users = new Schema({
    fullname: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    dob: {type: Date,required: true},
    gender: {type: String, required: true},
    mobile: {type: Number, required: true},
    image: {type: String}
});

users.pre('save', function(next){
    now = new Date();
    this.updated_at = now;
    if(!this.created_at) {
        this.created_at = now
    }
    next();
});

module.exports = mongoose.model('users', users);
