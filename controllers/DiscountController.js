const Book = require ('../models/Book')
const Discount = require('../models/Discount')
 async function getBooks(req,res){
    try{
        //select _id,bookTitle from book => in my sql
        let books = await Book.find({},{ _id: 1, bookTitle: 1 })// in mongodb
        
        res.status(200).send({ data:books })

    }catch(err){
        
        res.status(400).send({message:'something went wrong'})
    }

}
async function addDiscount(req,res){
    try{
         
         let discount = new Discount(req.body)
         await discount.save()
         res.status(200).send({message: 'Discount Added'})
    }catch(err){
        
         res.status(400).send({message: 'Something Went Wrong'})
    }
}
async function getDiscounts(req,res){
    try{
        let discounts= await Discount.find({}).populate('book');
        
        res.status(200).send({ data:discounts})
    }catch(err){
        
         res.status(400).send({ message:'some thing went wrong '})
    }
}
async function getDiscountForEdit(req,res){
    try{
         let id = req.params.id;
         let discount = await Discount.findOne({_id : id});
         let books = await Book.find({});
       
         res.status(200).send({data : discount, books: books})
            }
            catch{
        console.log(err)
        res.status(400).send({message : 'something went wrong'})
    }
}
async function editDiscount(req,res){
    try{
          let id = req.params.id;
          await Discount.updateOne({_id: id},req.body)
          console.log('Data has been successfully updated...')
          res.status(200).send({message: 'Data Inserted Successfully..'})
    }catch(err){
      console.log(err)
       res.status(400).send({message: 'Data Inserted Successfully..'})
    }
}
module.exports= {
    getBooks,
    addDiscount,
    getDiscounts,
    getDiscountForEdit,
    editDiscount
}