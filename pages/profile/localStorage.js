let user = {}
let repos = []

function getUserNow() {
    const getJson = localStorage.getItem("userNow")

    if (getJson){
        user = JSON.parse(getJson)
    }
}

function getRepoNow() {
    const getJson = localStorage.getItem("repoNow")

    if (getJson){
        repos = JSON.parse(getJson)
    }
}

getUserNow()

getRepoNow()