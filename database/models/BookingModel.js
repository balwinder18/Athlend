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
      email : {type:String , required:true},



 amount: { type: Number, required: true }, 
  discount: { type: Number, default: 0 },
  sgst: { type: Number, default: 0 },
  cgst: { type: Number, default: 0 },
  gross: { type: Number, default: 0 },
  taxable: { type: Number, default: 0 }


},{timestamps:true})


BookingSchema.index({ userId: 1 });


export default mongoose.models.Bookings || mongoose.model("Bookings" , BookingSchema);