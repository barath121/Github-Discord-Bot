const mongoose = require('mongoose')
const UserSchema = mongoose.Schema({
    username : {
        type : String
    },
    showrepo : {
        type : String
    },
    discordid:{
        type : String
    },
    portfolio : {
        type : String
    }
})
const User = mongoose.model('User',UserSchema)
module.exports = User