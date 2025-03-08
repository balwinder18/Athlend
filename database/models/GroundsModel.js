const mongoose = require("mongoose");


const GroundsSchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    userId:{type:String  ,required:true}
})

module.exports = mongoose.models.Grounds || mongoose.model("Grounds" , GroundsSchema);