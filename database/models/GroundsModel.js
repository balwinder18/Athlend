const mongoose = require("mongoose");


const GroundsSchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    userId:{type:String  ,required:true},
    Approval:{type:String  ,default:"no"},
    imageUrl:{type:String , default:null},
    capacity:{type:String , default:null},
    pricing:{type:String , default:null},
    email:{type:String , default:null},
    phone:{type:String , default:null},
    facilities:{type:String,default:null},
    sport:{type:String,default:null},

    operatingHours: {
        // Store as 24-hour format (e.g., "08:00", "22:00")
        open: {
          type: String,
        //   required: [true, 'Opening time is required'],
        default:"16:00",
          match: [/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format (HH:MM)'],
        },
        close: {
          type: String,
        //   required: [true, 'Closing time is required'],
        default:"22:00",
          match: [/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format (HH:MM)'],
        },
      },
      slotDuration: {
        type: Number,
        default: 30, // in minutes
        enum: [30, 60, 90, 120], // Common slot durations
      },
      pricePerSlot: {
        type: Number,
        // required: [true, 'Price per slot is required'],
        default:49,
        min: [0, 'Price cannot be negative'],
      },
    
})

module.exports = mongoose.models.Grounds || mongoose.model("Grounds" , GroundsSchema);