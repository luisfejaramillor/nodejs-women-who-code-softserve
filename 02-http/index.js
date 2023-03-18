const http = require('http');
const data = require('./data')
const {obj} = data
const HOST = 'localhost'
const PORT = 3001


const writeHttmlResponde = (res, htmlCode)=> {
    res.setHeader('content-type', 'text/html utf-8')
    res.writeHead(200)
    res.end(htmlCode)
}

const writeJsonResponse = (res, json)=> {
    res.setHeader('content-type', 'application/json')
    res.writeHead(200)
    res.end(JSON.stringify(json))
}


const server = http.createServer( async(req, res) => {
   const {method, url} = req

   let body = ''

   await req.on("data", (chunk) => {
    body += chunk;
  })

    if(url === '/api/v2/users'){

        if(method==='GET'){
            writeJsonResponse(res, obj )
            return
        }

        if(method === 'POST'){
            obj.push(JSON.parse(body))
            writeJsonResponse(res, obj )
            return
        }

        if(method ==='DELETE'){
            const {name} = JSON.parse(body)
            const indexProduct = obj.findIndex(e => e.name===name)
            if(indexProduct !== -1){
                obj.splice(indexProduct, 1)
            }
            writeJsonResponse(res, obj);
            return
        }
    }

    writeHttmlResponde(res, '<p>Codigo html</p>' )
})


server.listen( PORT, HOST, ()=> {
    console.log(`Servidor corriendo en http://${HOST}:${PORT}`)
})