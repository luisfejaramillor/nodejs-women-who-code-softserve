const fetchData = async()=> {
    try {
        const result = await fetch('https://rickandmortyapi.com/api/character')
        const {results} = await result.json()
        return results.map(({id,name,gender})=> ({id,name, gender}))
    } catch (error) {
        console.log(error)
    }

}



module.exports = {fetchData}