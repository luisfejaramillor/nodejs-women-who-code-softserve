const express = require('express')
const bodyParser = require('body-parser')

const PORT = 3000

const app = express()

const {obj} = require("../02-http/data")
const endPoint = '/api/v2/users'

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

const errorLogger = (err, req, res, next)=> {
next(err)
}

const errorHandler = (err, req, res, next)=> {
console.log(err)
// res.status(400)
res.json(err)
}

app.get('/',(req,res)=> {
res.send(obj)
})

app.get(endPoint,(req, res)=> {
res.json(obj)
})

app.get(`${endPoint}/:id`, (req, res)=> {
const {id} = req.params
const result = obj.find(e => e.id === parseInt(id))
if(!result){
throw new Error('User nor found')
}
res.json(result)
})

app.post(endPoint, (req, res)=> {
let data = req.body;
obj.push(data)
res.json(obj)
} )

app.use(errorHandler)
app.use(errorLogger)

app.listen(PORT, ()=> {
console.log('escuchando en http://localhost')
})
