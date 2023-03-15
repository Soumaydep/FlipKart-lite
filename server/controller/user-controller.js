
import User from '../model/user-schema.js';
import jwt from 'jsonwebtoken';

const generateToken = (user_d) => {
    return jwt.sign({ user_d }, process.env.JWT_KEY, {
      expiresIn: "15d",
    });
  };

export const userSignup=  async  (request,response)=>
{
    try{
        const exist=await User.findOne({username:request.body.username});
        if(exist)
        {
            return response.status(401).json({message:'Username already exist'});
        }

        const user=request.body;
        console.log(request.body);
        const newUser=new User(user);
        await newUser.save();

        response.status(200).json({message:user,token: generateToken(user)})
    }
    catch(error)
    {
        response.status(500).json({message:error.message})
    }
}


export const userLogin= async(request,response)=>
{
   try{
      const username=request.body.username;
      const password=request.body.password;

      const user=await User.findOne({username:username,password:password});
      if(user){
        console.log("user_id:",user._id);
        return response.status(200).json({data:user,token: generateToken(user)});
      } 
      else {
        return response.status(401).json('Invalid login');
      }
     

   }
   catch(error)
   {
       response.status(500).json('Error',error.message);
       return error.response;
   }
}


export const getTokenAfLogin=async(req,res)=>
{
  try{
    const user= await req.body;
    const token=generateToken(user);
    console.log(token);
    return res.status(200).json({token});
  }
  catch(error){
      response.status(500).json('Error',error.message);
       return error.response;
  }
  
  
}


// export const userSignup = asyncHandler(async (req, res) => {
//     const { name, email, password } = req.body;
//     const userExist = await User.findOne({ email });
//     if (userExist) {
//       res.status(400);
//       throw new Error("User Already Exists!");
//     }
  
//     const user = await User.create({ name, email, password });
//     if (user) {
//       res.status(201).json({
//         _id: user._id,
//         data:user.username,
//         token: generateToken(user._id),
//       });
//     } else {
//       res.status(404);
//       throw new Error("User Not Found");
//     }
//   });
  
// export const userLogin = asyncHandler(async (req, res) => {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });
//     if (user && (await user.matchPassword(password))) {
//       res.json({
//         _id: user._id,
//         data:user.username,
//         token: generateToken(user._id),
//       });
//     } else {
//       res.status(401);
//       throw new Error("Invalid Email or Password");
//     }
//   });
