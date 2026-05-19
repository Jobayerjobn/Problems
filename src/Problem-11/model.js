//model.js

import mongoose from "mongoose";

const {Schema, model} = mongoose;

//create model
const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,

    }

}, 
{
    timestamps: true
}
);


//create model
const User = model('User', userSchema);

export default User;

