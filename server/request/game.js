const {Router} = require('express')
const router = Router()


//models
const Game = require('../schema/game')


router.post('/create', async (req,res)=>{
    try{
        const game = new Game({
            users: [{name: req.body.name, id: req.body.id, author: true, draw: true}]
        })
        await game.save()

        return res.status(200).json({game})
    }
    catch(err){
        console.log(err)
        return res.status(400).json({message: 'Bad request'})
    }
})

router.post('/get', async (req,res)=>{
    try{
        const game = await Game.findOne({_id: req.body._id})

        if(!game){
            return res.status(400).json()
        }
        else{
            if(game.users.find(it=>it.author === true).id === req.body.id){
                return res.status(200).json({game})
            }
    
            game.users.push({id: req.body.id,name: req.body.name, draw: false})
    
            await game.save()
    
            return res.status(200).json({game})
        }
        
    }
    catch(err){
        return res.status(400).json({message: 'Bad request'})
    }
})

router.post('/new-word', async (req,res)=>{
    try{
        const game = await Game.findOne({_id: req.body._id})

        if(!game){
            return res.status(400).json()
        }
        else{
            
            game.word = req.body.word
    
            await game.save()
    
            return res.status(200).json({game})
        }
        
    }
    catch(err){
        return res.status(400).json({message: 'Bad request'})
    }
})


module.exports = router;