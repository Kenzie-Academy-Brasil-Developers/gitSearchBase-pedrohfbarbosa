function createCardMinor(user) {
    const li = document.createElement("li")
    li.classList.add("card-minor")

    const a = document.createElement("a")
    a.href = ""

    a.addEventListener("click", async (event) => {
        event.preventDefault()       
        
        const userNowToJson = JSON.stringify(user)
        localStorage.setItem("userNow", userNowToJson) 

        repoNow = await getRepos(user.login)
        const repoToJson = JSON.stringify(repoNow)
        localStorage.setItem("repoNow", repoToJson)
        
        await getRecentAdded()
        
        const testFind = recentAdded.findIndex((elt) => elt.id === user.id)
        
        recentAdded.splice(testFind, 1)
        recentAdded.push(user)       
        
        const recentToJson = JSON.stringify(recentAdded)
        localStorage.setItem("recentAdded", recentToJson)

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
    
    arr.forEach((user) => recentAddedWrapper.appendChild(createCardMinor(user)))   
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
    document.getElementById("alert").classList.add("hidden")
    
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
        btnMain.disabled = true
        btnMain.classList.add("btn-disabled")

        inputMain.value = ""
    }else {
        document.getElementById("alert").classList.add("hidden")         
        
        await getRecentAdded()

        const testFind = recentAdded.findIndex((elt) => elt.id === userNow.id)
        if (testFind < 0) {
            if (recentAdded.length < 3){
                recentAdded.push(userNow)
            }else {
                recentAdded.shift()
                recentAdded.push(userNow)
            }
        }else {
            recentAdded.splice(testFind, 1)
            recentAdded.push(userNow)
        }

        repoNow = await getRepos(userName)
        const repoToJson = JSON.stringify(repoNow)
        localStorage.setItem("repoNow", repoToJson)

        const recentToJson = JSON.stringify(recentAdded)
        localStorage.setItem("recentAdded", recentToJson)

        const userNowToJson = JSON.stringify(userNow)
        localStorage.setItem("userNow", userNowToJson)  
        
        window.location.replace("../profile/index.html")        
    }
})

renderMinorCard(recentAdded)