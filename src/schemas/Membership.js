const mongoose = require('mongoose')

const membership_Schema = mongoose.Schema({
    user_id :{
        type:mongoose.Types.ObjectId,
        ref:'User'
    }
})