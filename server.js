import mongoose from 'mongoose'
import express from 'express' 
import Cards from './dbCards.js'
import Cors from 'cors'

//App Config
const app = express()
const port = process.env.PORT || 8000
const connection_url = 'mongodb+srv://admin:admin@refactor.418dia3.mongodb.net/tinderDB'

//Middleware
app.use(express.json())
// app.use(expess.urlencoded({ extended : true }))
app.use(Cors())

//DB config
mongoose.connect(connection_url)

//API Endpoints
app.get('/', (req, res) => res.status(200).send("welcome from mern-tinder"))

app.post('/tinder/cards', (req, res) => {
    const dbCard = req.body;
    Cards.create(dbCard)
        .then(data => res.status(201).send(data))
        .catch(err => res.status(500).send(err))
})

app.post('/tinder-form', (req,res) => {
    const dbCard = req.body;
    Cards.insertOne(dbCard)
        .then(data => res.status(201).send(data))
        .catch(err => res.status(500).send(err))
})

app.get('/tinder/cards', (req,res) => {
    Cards.find()
        .then(data => res.status(200).send(data))
        .catch(err => res.status(500).send(err))
})

app.delete('/:id', async (req, res) => {
    try {
      const itemId = req.params.id;
  
      const removedItem = await Cards.findByIdAndRemove(itemId);
  
      if (!removedItem) {
        return res.status(404).json({ error: 'Item not found.' });
      }
  
      return res.json({ message: 'Item deleted successfully.' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Failed to delete item.' });
    }
  });
  
  

//Listener
app.listen(port, () => console.log(`server is up on port : ${port}`));