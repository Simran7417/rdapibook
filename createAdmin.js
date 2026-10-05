const User=require('./models/User')
const bcrypt = require('bcrypt')
 async function createAdmin(){
    try {
          let user = await User.findOne({email:'1simran8148@gmail.com'});
          if(user){
            console.log('user updated successfully...');
          }else{
            user = new User();
            user.firstName ='Simran';
            user.lastName='Simran';
            user.mobileNo ='7417938148';
            user.email='1simran8148@gmail.com';
            let password =bcrypt.hashSync('123456',10);
            user.password=password;
            user.userType ='admin';
            await user.save();
            console.log('user created successfully...')
          }
    }catch(err){
        console.log(err)
    }
}
module.exports = createAdmin