const apiUsuarios = async () => {
    try {
        const response = await fetch('https://randomuser.me/api/')
        //console.log(response)

        if (response.status === 200) {
            const data = await response.json()
            const user = data.results[0]
            return user
        }
    } catch (error) {
        console.log(error.message)
    }
}

export default apiUsuarios;