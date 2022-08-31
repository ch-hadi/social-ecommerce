const mongoose = require('mongoose')

const User_Schema = mongoose.Schema({
    name:{
        type : String,
        required: [true, "Please enter full name"],
    },
    email:{
        type : String,
        unique : true,
        match: [
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please add a valid email",
          ],
    },  
    password:{
        type : String,
        require : [true, "Please enter password"]
    } ,
    username : {
        type : String,
        require : [true, "Please enter username"]
    },
    blood_group:{
        type : String,
        require : [true,"Please enter blood group"]
    },
    gender:{
        type : String,
        require : true
    },
    tell:{
        type : String,
        require : true
    },
    city:{
        type: String,
        require: true
    },
    location: {
        type: {
          type: String, // Don't do `{ location: { type: String } }`
          enum: ['Point'], // 'location.type' must be 'Point'
          required: true
        },
        coordinates: {
          type: [Number],
          required: true
        }
      }
    
},
{
    timestamp :true
}
)
User_Schema.index({ location: "2dsphere" });

const User = mongoose.model('User' , User_Schema)

module.exports = User