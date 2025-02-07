// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//     client_name: { type: String, required: true },
//     industry: { type: String, required: true },
//     status: { type: String, required: true },
//     contact_person: { type: String, required: true },
//     region: { type: String, required: true },
    // address: {
    //     street: String,
    //     city: String,
    //     state: String,
    //     postal_code: String,
    //     country: String
    // }
// });

// // Change the model name to 'User' and it will use the 'users' collection in MongoDB
// const User = mongoose.model('User', userSchema, 'users');
// module.exports = User;
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
    client_name: { type: String, required: true },
    contact_person: { type: String, required: true },
    phone: { type: String },
    industry: { type: String },
    status: { type: String },
    address: {
      street: { type: String },
      city: { type: String },
      state: { type: String },
      postal_code: { type: String },
      country: { type: String },
    },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    approved: { type: Boolean, default: false }, // New field to track approval status
  });
  

const User = mongoose.model('User', userSchema);
module.exports = User;
