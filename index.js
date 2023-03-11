// const test = require('is-odd')

// const fs = require('fs')


// const path = require('path')

//  const getFile = async()=> {
//     try {
//         const filePath = path.resolve(`${__dirname}/archivo.txt`)
//         const data = await fs.promises.readFile(filePath, 'utf-8')
//     } catch (error) {
        
//     }
//  }




//  getFile()


//  const writeFile = async()=> {
//     const newText = 'soy un texto nuevo'
//     try {
//         const filePath = path.resolve(`${__dirname}/archivos.txt`)
//          await fs.promises.writeFile(filePath, newText)
//          await fs.promises.appendFile(filePath, 'hello my fried')
//         const result = await fs.promises.readFile('archivos.txt', 'utf-8')
//         console.log(result)
//     } catch (error) {
        
//     }
//  }

// writeFile()

// const fetch = require('node-fetch')



const fetchApi = require('./utils/fetch')

const {fetchData} = fetchApi

fetchData().then(res => console.log(res))
