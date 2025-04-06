import mongoose, { mongo } from "mongoose"

const BookingSchema = new mongoose.Schema({
    groundId : {type:String , required:true},
    userId : {type:String , required:true},
    startTime : {type:String , required:true},
    endTime : {type:String , required:true},
    bookingdate : {type:String , required:true},
    orderId : {type:String , required:true},
    status: { 
        type: String, 
        enum: ['booked', 'cancelled', 'pending'],
        default: 'booked'
      }
},{timestamps:true})

module.exports = mongoose.models.Bookings || mongoose.model("Bookings" , BookingSchema);