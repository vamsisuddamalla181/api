import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import User from '../model/usermodel';
import jwt from 'jsonwebtoken'
import { validateUser } from '../schemas/schems';
const mykeys=process.env.mykey||"this is key"
const userrgister=async (req:Request,res:Response)=>{
    try{
        const {error}=validateUser(req.body)
        if(error){
            return res.status(404).json({message:error.message})
        }
        const {name,email,password}=req.body
        const already=await User.findOne({email})
        if(already){
            return res.status(200).json({message:"user already exists"})
        }
        const hashed=await bcrypt.hash(password,14)
        const newuser=new User({
            name,
            email,
            password:hashed
        })
        await newuser.save()
        res.json(newuser)
    }
    catch(error){
        res.status(500).json({message:"server error"})
        console.log(error)
    }
}
const find = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const findone = await User.findById(id);

    if (!findone) {
      return res.status(404).json({ message: 'User not found' });
    }

    const webtoken = jwt.sign(
      {
        name: findone.name,
        email: findone.email,
        password: findone.password 
      },
      mykeys,
    );

    res.status(200).json({ token: webtoken });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


export default {userrgister,find};
