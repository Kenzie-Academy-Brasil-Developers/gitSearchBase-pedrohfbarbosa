const githubApi = "https://api.github.com/users/"

async function getUser(username) {
    try {
        const getApi = await fetch(`${githubApi}${username}`)
        const user = await getApi.json()

        return user
    } catch(error) {
        console.log(error)        
    }  
}

async function getRepos(username) {
    try {
        const getApi = await fetch(`${githubApi}${username}/repos`)
        const userRepos = await getApi.json()

        return userRepos
    } catch(error) {
        console.log(error)
    } 
}