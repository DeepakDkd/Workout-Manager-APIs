import { user } from "../Models/UserModel.js";
import { generateToken, verifyToken } from "../Utils/TokenGenerator.js";

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const User = await user.login(email, password);
    const token = generateToken(User._id);
    return res.status(200).json({ success: true, token });
  } catch (error) {
    return res.status(401).json({ success: false, error: error.message });
  }
};

const signUpUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const User = await user.signUp(name, email, password);
    const token = generateToken(User._id);
    return res.status(200).json({ success: true, email, token });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};  

const getUser = async(req , res)=>{

    const token = req?.headers?.authorization?.split(' ')[1]


      console.log(token)
  




    if(!token){
        return res.status(401).json({error:"Access token is required"})
    }


  const {_id} = verifyToken(token); 

  console.log(_id)


    if(!_id){
        return res.status(401).json({error:"Invalid access token"});
    }

    const User = await user.findById(_id).select("-password");
    console.log(User)
    
    if(!User){
      return res.status(401).json({error:"You are not authorized  to view this profile."});
    }

    return res.status(200).json({success:true, User});
    
}

export { loginUser, signUpUser , getUser };
 