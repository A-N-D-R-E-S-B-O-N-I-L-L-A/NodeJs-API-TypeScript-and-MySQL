import {Request, Response} from 'express'
import UserModel from '../models/user.model'

export const getUsers = async(req:Request, res: Response) =>{

    try {

        const users = await UserModel.findAll();

        res.json({
            users
        })
        
    } catch (error) {

        console.log(error)
        return res.status(500).json({
            msg: 'there was a problem with the server'
        })

    }


}

export const getUser = async(req:Request, res: Response) =>{

    const {id} = req.params;

    try {
        
        const user = await UserModel.findByPk(id);

        if(!user){
            return res.status(404).json({
                msg: `there isn't an user with the id: ${id}`
            })
        }

        res.json({
            user
        })
        
    } catch (error) {

        console.log(error)
        return res.status(500).json({
            msg: 'there was a problem with the server'
        })

    }

}

export const createUser = async(req:Request, res: Response) =>{

    const { body } = req;

    try {

        const existEmail = await UserModel.findOne({
            where:{
                email: body.email
            }
        })

        if (existEmail) {
            return res.status(400).json({
                msg: 'the email already exists, try another'
            })
        }

        const user = await UserModel.create(body)

        res.json({
           user
        })
        
    } catch (error) {

        console.log(error)
        return res.status(500).json({
            msg: 'there was a problem with the server'
        })

    }

}

export const updateUser = async(req:Request, res: Response) =>{

    const { id } = req.params;
    const { body } = req;

    try {

        const user = await UserModel.findByPk(id);

        if (!user) {
            return res.status(404).json({
                msg: 'the user was not found'
            })
        }

        await user.update(body)

        res.json({
            user
        })
        
    } catch (error) {

        console.log(error)
        return res.status(500).json({
            msg: 'there was a problem with the server'
        })

    }

}

export const deleteUser = async(req:Request, res: Response) =>{

    const { id } = req.params;

    try {

        const user = await UserModel.findByPk(id);

        if (!user) {
            return res.status(404).json({
                msg: 'the user was not found'
            })
        }

        // physical removal
        // await user.destroy();

        // logical removal
        await user.update({status:false})

        res.json({
            user
        })
        
    } catch (error) {

        console.log(error)
        return res.status(500).json({
            msg: 'there was a problem with the server'
        })

    }

}