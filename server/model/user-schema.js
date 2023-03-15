import mongoose from 'mongoose';

const userSchema= new mongoose.Schema(
    {
      firstname:{
        type:String,
        required:true,
        trim:true,
        min:5,
        max:20
      },
      lastname:{
        type:String,
        required:true,
        trim:true,
        min:5,
        max:20
      },
      username:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        index:true,
        lowercase:true
      },
      email:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        lowercase:true,
      },
      password:
      {
       type:String,
       required:true
      },
      phone:
      {
        type:String,
        required:true 
      }

    }
);
// userSchema.methods.matchPassword = async function (enterPassword) {
//   return await bcrypt.compare(enterPassword, this.password);
// };

// //middlware for password
// userSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) {
//     next();
//   }
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
// });




const User= mongoose.model('user',userSchema);
export default User;