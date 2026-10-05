const mongoose= require('mongoose')
const Schema = mongoose.Schema
const discountSchema = new Schema({
    book:{type: mongoose.Schema.Types.ObjectId, ref: 'Book', require:true},
    discountName: { type: String,require:true },
    discountType: { type:String,default: 'Percentage', enum:['Percentage','Fixed'] },
    discountValue:{ type:Number,default:0, require:true},
    validFrom: { type:Date,required:true },
    validTo: { type:Date, require: true},
    status: { type: String, default: "Active",enum:['Active','InActive']}


},{ timestamps: true })
module.exports = mongoose.model('Discount', discountSchema)