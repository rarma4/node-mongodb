import express from 'express'
import cors from 'cors'
import { PrismaClient } from './generated/prisma/index.js'



const prisma = new PrismaClient()

const app = express()
app.use (express.json())
app.use(cors())

app.post('/usuarios', async (req, res) => {
    await prisma.user.create({
        data: {
            email: req.body.email,
            name: req.body.name,
        }
    })
    res.status(201).json(req.body)
    res.send("Usuário adicionado com sucesso!")
})

app.get('/usuarios', async (req, res) => {

  let users = []

  if(req.query){
    
    users = await prisma.user.findMany({
      where:{
        name : req.query.search,
        // email : req.query.search
      }
    })

  }else{
    
    users = await prisma.user.findMany()
  }

    
  res.json(users)
})

app.put('/usuarios/:id', async (req, res) => {
  await prisma.user.update({
        where: {
            id: req.params.id
        },
        data: {
            email: req.body.email,
            name: req.body.name,
        }
    });
    res.status(200).json(req.body)
});

app.delete('/usuarios/:id', async (req, res) => {
    await prisma.user.delete({
        where: {
            id: req.params.id
        }
    });
    res.status(204).json({ message: 'Usuário deletado com sucesso!' });
  });


// app.listen(3000) 

app.listen ({
    host: '0.0.0.0',
    port: process.env.PORT ?? 3333,
})
// rarma4
// dk0155bd