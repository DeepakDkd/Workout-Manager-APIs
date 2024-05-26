import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      requried: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// user static login
userSchema.statics.login = async function(email, password) {
    // validate the inputs
    if(!validator.isEmail(email)){
        throw Error("Enter valid email")
    }

    const user = await this.findOne({email});

  
    console.log(user)


    if(!user){
        throw  Error('User not found')
    }

    const isPasswordValid = await bcrypt.compare(password , user.password)
    

    if( !isPasswordValid ) {
       throw Error ('Invalid Password');
    }
    
    return user;
}



// user static signUp

userSchema.statics.signUp = async function (name, email, password) {
  if (!name || !email || !password) {
    throw Error("Please provide all fields");
  }
  // validate the data
  if (!validator.isEmail(email)) {
    throw Error("enter a valid Email");
  }
  // if (!validator.isStrongPassword(password)) {
    // throw Error("create a strong Password");
  // }

  
  const exist = await this.findOne({ email });
  if (exist) {
    throw Error("User already exists");
  }


  const salt = await bcrypt.genSalt(10);

  const hashed = await bcrypt.hash(password, salt);



  const user = await this.create({ name, email, password: hashed });

  return user;
};

export const user = mongoose.model("user", userSchema);
