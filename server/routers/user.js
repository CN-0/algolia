const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')

const router  = new express.Router()

router.post('/register',async (req,res)=>{
    const user = new User(req.body)
    try{
        await user.save()
        const token =await user.generateAuthToken()
        res.status(201).send({user,token})
    }catch(e){
        res.status(400).json({msg:e.message})
    }
    
})

router.post('/login',async (req,res)=>{
    try{
        const user = await User.findUser(req.body.username,req.body.password)
        const token = await user.generateAuthToken()
        res.status(200).send({user,token})
    }catch(e){
        res.status(400).json({msg:e.message})
    }
    
})

router.post('/logout',auth, async (req,res)=>{
    try {
        req.user.tokens = req.user.tokens.filter((token)=>{
            return token.token !== req.token
        })
        await req.user.save()
        res.status(200).json({msg:"you are successfully logged out"})
    } catch (e) {
        res.status(500).json({msg:e.message})
    }
})

router.patch('/update',auth, async (req,res)=>{
    try {
        req.user["password"] = req.body["password"]
        await req.user.save()
        res.status(200).send("password changed successfully!")
    } catch (e) {
        res.status(400).json({msg:e.message})
    }
})

router.delete('/delete',auth, async(req,res)=>{
    try {
        await req.user.remove()
        res.send(req.user)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router

