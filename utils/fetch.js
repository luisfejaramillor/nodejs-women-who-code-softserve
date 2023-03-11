const fetchData = async()=> {
    try {
        const result = await fetch('https://rickandmortyapi.com/api/character')
        const res = await result.json()
        const {results} = res
        return results.map(e => {
            return{
                id: e.id,
                name: e.name,
                gender: e.gender
            }
        })
        
    } catch (error) {
        console.log(error)
    }

}



module.exports = {fetchData}