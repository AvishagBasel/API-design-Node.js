import prisma from "../db";

export const getAllUserUpdates = async (req, res)=>{
    const userUpdates = await prisma.update.findMany({
        where:{
            product:{
                belongsToId:req.user.id
            }
        }
    })
    res.json({data:userUpdates})
}

export const getOneUserUpdate = async (req, res)=>{
    const id = req.params.id
    const update = await prisma.update.findFirst({
        where:{
            id,
            product:{
                belongsToId:req.user.id
            }
        }
    })
    res.json({data: update})
}

export const createUpdate = async (req,res)=>{

    try{
        const product = await prisma.product.findUnique({
            where: {
                id_belongsToId: {
                    id: req.body.productId,
                    belongsToId: req.user.id
                }
            }
          })
          if(!product){
            throw new Error() 
          }
        const update = await prisma.update.create({
            data: {
              title: req.body.title,
              body: req.body.body,
              product: {connect: {id: product.id}}
            }
          })
        res.json({data:update})
    } catch(e){
        return res.json({massage:"there isnt a fit product to update"})
    }

}

export const updaterUpdate = async (req,res)=>{
    const id = req.params.id
    try{
        const updated = await prisma.update.update({
            where:{
                id,
                product:{
                    belongsToId:req.user.id
                }
            },
            data:req.body
        })
        res.json({data:updated})
    }catch(e){
        return res.json({massage: "there isnt a fit product to update"})
    }

}

export const deleteUpdate = async (req,res)=>{
    const id = req.params.id
    const deleted = await prisma.update.delete({
        where:{
            id,
            product:{
                belongsToId:req.user.id
            }
        }
    })
    res.json({data:deleted})
}