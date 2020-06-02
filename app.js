const express = require('express')
const app = express()
const mongoose = require('mongoose')
const helmet = require('helmet')
const compression = require('compression')
const session = require('express-session')
const User = require('./models/User')
const authRouter = require('./routes/auth')
const todoRouter = require('./routes/addTodo')
const path = require('path')

const config = require('./config')
const PORT = config.BASE_URL || 5000

const path = require('path')



app.use(express.json({extended: true}))
app.use(helmet())
app.use(compression())


app.use('/api/auth', authRouter)
app.use('/api/todo', todoRouter)

if(express.env.NODE_ENV === 'production'){
  app.use('/', express.static(path.join(__dirname, 'client', 'build')))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

app.use(express.urlencoded({extended:true}))

async function start(){
  try{
    await mongoose.connect(config.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  
  app.listen(PORT, () => {
    console.log(`App has been started on port ${PORT}...`)
  })
  }catch(e){
    console.log('Server error', e.message)
    process.exit(1)
  }
}




start()

