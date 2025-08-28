import mongoose, { mongo } from "mongoose"

const BookingSchema = new mongoose.Schema({
    groundId : {type:String , required:true},
    groundName : {type:String , required:true},
    userId : {type:String , required:true},
    startTime : {type:String , required:true},
    endTime : {type:String , required:true},
    bookingdate : {type:String , required:true},
    orderId : {type:String , required:true},
    status: { 
        type: String, 
        enum: ['booked', 'cancelled', 'pending','blocked'],
        default: 'booked'
      },
     
      qrImage: {type:String , required:true},
      isScanned:{type:String ,default:false},
},{timestamps:true})


BookingSchema.index({ userId: 1 });


module.exports = mongoose.models.Bookings || mongoose.model("Bookings" , BookingSchema);