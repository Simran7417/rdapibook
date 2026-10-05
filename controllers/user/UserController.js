const User = require('../../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

async function addUser(req, res) {

    try {

        console.log("USER DATA:", req.body)

        let user = await User.findOne({
            email: req.body.email,
            userType: 'user'
        })

        if (user) {

            return res.status(400).send({
                success: false,
                message: 'User already exists'
            })

        }

        let password = bcrypt.hashSync(req.body.password, 10)

        let newUser = new User(req.body)

        newUser.password = password

        await newUser.save()

        console.log("USER SAVED SUCCESSFULLY")

        return res.status(200).send({
            success: true,
            message: 'Welcome to our platform. Please login'
        })

    }
    catch (err) {

        console.log("ERROR:", err)

        return res.status(400).send({
            success: false,
            message: err.message
        })
    }
}
async function doUserLogin(req,res){
    try{
         console.log(req.body);
         let user = await User.findOne({ email: req.body.email})
         if(!user){
            res.status(400).send({message:'Invalid user/Password....'})
         }else{
               let validUser = await bcrypt.compare(req.body.password,user.password);
               if(validUser){
                  user.lastLogin = new Date();
                  await user.save()
                  let secret_key = 'b2Vfb3ZlcnRoZXJlX29yX3NvbWV0aGluZ19lbHNld2hlcmU';
                  let token = jwt.sign({ _id: user._id,email:user.email},secret_key,{ expiresIn:'3hr'})//payload,secretkey,rendom
                  console.log(token,'token')
                  let data = {
                    email: user.email,
                    name: user.firstName,
                    token: token
                  }
                  res.status(200).send({data: data});
               }else{
                  res.status(400).send({message:'Invalid user/Password....'})
               }
            
         }
       
    }catch(err){
        console.log(err)
        res.status(400).send({message:'something went wrong'})
    }
}
module.exports = {
    addUser,
    doUserLogin
}