function createCardMinor(user) {
    const li = document.createElement("li")
    li.classList.add("card-minor")

    const a = document.createElement("a")
    a.href = ""
    a.addEventListener("click", async (event) => {
        event.preventDefault()
        
        await getRecentAdded()

        userNow = user
        const userNowToJson = JSON.stringify(userNow)
        localStorage.setItem("userNow", userNowToJson) 

        const testFind = recentAdded.findIndex((elt) => elt.id === userNow.id)

        recentAdded.splice(testFind, 1)
        recentAdded.push(userNow)

        const recentToJson = JSON.stringify(recentAdded)
        localStorage.setItem("recentAdded", recentToJson)

        repoNow = await getRepos(user.login)
        const repoToJson = JSON.stringify(repoNow)
        localStorage.setItem("repoNow", repoToJson)

        window.location = "../profile/index.html"
    })

    a.innerHTML = `
        <figure>
            <img src="${user.avatar_url}" alt="">           
            <figcaption>Acessar perfil</figcaption>       
        </figure>
    `

    li.appendChild(a)
    
    return li
}

function renderMinorCard(arr) {
    const recentAddedWrapper = document.querySelector(".recent-added")
    recentAddedWrapper.innerHTML = ""
    
    if (arr.length <= 3) {
        arr.forEach((user) => recentAddedWrapper.appendChild(createCardMinor(user)))
    }else {
        newArr = arr.splice(arr.length - 3, 3)    

        newArr.forEach((user) => recentAddedWrapper.appendChild(createCardMinor(user)))
    }
    
}

function createSpinner() {
    const div = document.createElement("div")
    div.classList.add("spinner")

    div.innerHTML = `🌀`

    return div
}

const inputMain = document.getElementById("input-main")
const btnMain = document.getElementById("btn-main")

inputMain.addEventListener("input", () => {
    if (inputMain.value == ""){
        btnMain.disabled = true
        btnMain.classList.add("btn-disabled")
    } else {
        btnMain.disabled = false
        btnMain.classList.remove("btn-disabled")
    }
})

btnMain.addEventListener("click", async (event)=>{
    event.preventDefault()

    btnMain.innerHTML = ""
    btnMain.appendChild(createSpinner())

    const userName = inputMain.value

    userNow = await getUser(userName)

    if (userNow.message) {
        document.getElementById("alert").classList.remove("hidden")

        btnMain.innerHTML = "Ver perfil do github"
    }else {
        document.getElementById("alert").classList.add("hidden")         
        
        await getRecentAdded()

        const testFind = recentAdded.findIndex((elt) => elt.id === userNow.id)
        if (testFind < 0) {
            recentAdded.push(userNow)
        }else {
            recentAdded.splice(testFind, 1)
            recentAdded.push(userNow)
        }

        btnMain.innerHTML = "Ver perfil do github"

        repoNow = await getRepos(userName)
        const repoToJson = JSON.stringify(repoNow)
        localStorage.setItem("repoNow", repoToJson)

        const recentToJson = JSON.stringify(recentAdded)
        localStorage.setItem("recentAdded", recentToJson)

        const userNowToJson = JSON.stringify(userNow)
        localStorage.setItem("userNow", userNowToJson)       
        
        window.location = "../profile/index.html"        
    }
})

renderMinorCard(recentAdded)