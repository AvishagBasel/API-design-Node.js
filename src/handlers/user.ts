import { runInNewContext } from "vm";
import prisma from "../db";
import { comparePasswords, createJWT, hashPassword } from "../modules/auth";

export const createNewUser = async (req,res)=>{
    const user = await prisma.user.create({
        data:{
            username:req.body.username,
            password: await hashPassword(req.body.password),
        }
    })

    const token = createJWT(user)
    res.json({token})
}

export const signin = async (req,res)=>{
    const user = await prisma.user.findUnique({
        where:{
            username:req.body.username,
        }
    })
    if(!user){
        res.status(401)
        res.json({message:"username not right"})
        return
    }
    const isvalid = await comparePasswords(req.body.password, user.password)
    if(!isvalid){
        res.status(401)
        res.json({message:"password not right"})
        return
    }
    const token = createJWT(user)
    res.json({token})
}