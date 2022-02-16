const shortid = require('shortid')
const Game = require('../schema/game')

module.exports = (app) =>{
    const io = app.get('socketio')
    io.on('connection', async (socket)=>{

        let _id;
        let id;
        let name;

        socket.on('createLobby', (msg)=>{
            _id = msg._id
            id = msg.id
            name = msg.name
            socket.join(msg._id)
            socket.to(msg._id).emit('userConnect',{name: msg.name, id: msg.id});
        })

        socket.on('disconnect',async (msg)=>{
            try{
                const disconnect = await Game.findOne({_id})
                const index = disconnect.users.findIndex(it=>it.id == id)
                disconnect.users.splice(index,1)
                if(disconnect.users.length === 0){
                    await Game.deleteOne({_id})
                }
                else{
                    socket.to(_id).emit('userDisconnect',{name, id});
                    let Drawer = disconnect.users.findIndex(it=>it.draw === true)
                    if(Drawer < 0){
                        disconnect.word = undefined
                        disconnect.users[0].draw = true
                        await disconnect.save()
                        socket.in(_id).emit('newDrawer', disconnect.users[0])
                        socket.emit('newDrawer', disconnect.users[0])
                    }
                    else{
                        await disconnect.save()
                    }
                }
            }   
            catch(err){
                return err
            }
        })
        
        socket.on('newDrawServer',(msg)=>{
            socket.to(_id).emit('newDrawClient',msg);
        })

        socket.on('startRound',(msg)=>{
            socket.in(_id).emit('startRound', 1)
            socket.emit('startRound', 1)
        })

        socket.on('newMes', async (msg)=>{
            try{
                const word = await Game.findOne({_id})
                if(word){
                    socket.in(_id).emit('newMes', msg)
                    socket.emit('newMes', msg)
                    if(word.word === msg.mes){
                        socket.in(_id).emit('win', msg)
                        socket.emit('win', msg)
                        word.word = undefined
                        await word.save()
                        setTimeout(async ()=>{
                            try{
                                const game = await Game.findOne({_id})
                                const newDrawer = game.users.findIndex(it=>it.draw === true)
                                if(newDrawer < 0){
                                    game.users[0].draw = false
                                    socket.in(_id).emit('newDrawer', game.users[0])
                                    socket.emit('newDrawer', game.users[0])
                                }
                                else if(game.users[newDrawer+1]){
                                    game.users[newDrawer].draw = false
                                    game.users[newDrawer+1].draw = true
                                    socket.in(_id).emit('newDrawer', game.users[newDrawer+1])
                                    socket.emit('newDrawer', game.users[newDrawer+1])
                                }
                                else{
                                    game.users[newDrawer].draw = false
                                    game.users[0].draw = true
                                    socket.in(_id).emit('newDrawer', game.users[0])
                                    socket.emit('newDrawer', game.users[0])
                                }
                                console.log(game)
                                await game.markModified('users');
                                await game.save()
                            }
                            catch(err){
                                console.log(err)
                            }
                        },5000)
                    }
                }
            }
            catch(err){
                return err
            }
        })


    })
}