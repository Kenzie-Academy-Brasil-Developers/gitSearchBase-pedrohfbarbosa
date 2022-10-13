let userNow = {}

let repoNow = []

let recentAdded = []

function getRecentAdded(){
    const getJson = localStorage.getItem("recentAdded")

    if (getJson){
        const recentAddedArray = JSON.parse(getJson)
        recentAdded = [...recentAddedArray]
    }
}

getRecentAdded()