const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email : {
    type : String,
    require : [true, "Email is required for creating a user"],
    trim : true,
    lowercase : true,
    match : [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
    unique : [true, "Email already exists"]
  },
  name: {
    type : String,
    required : [true, 'Name is required for creating an account']
  },
  password:{
    type: String,
    required : [true, "Password is required for creating an account"],
    minlenth : [6, "Password should contain more than 6 character"],
    select : false
  },
},{
  timestamp : true
})

userSchema.pre("save", async function(){
  if(!this.isModified("password")){
    return
  }
  const hash = await bcrypt.hash(this.password, 10) // hashed password is saved into hash 
  this.password = hash // and then it is saved into password

  return 
})

userSchema.methods.comparePassword = async function(password){
  return await bcrypt.compare(password, this.password) // compare database password with entered password 
}

const userModel = mongoose.model("user", userSchema)

module.exports = userModel;