function createCardName(user) {
    let divCard = document.createElement("div")
    divCard.classList.add("name-card")

    let divPicture = document.createElement("div")
    divPicture.classList.add("div-picture")

    let imgAvatar = document.createElement("img")
    imgAvatar.src = `${user.avatar_url}`
    imgAvatar.alt = `${user.name}`

    divPicture.appendChild(imgAvatar)

    let divName = document.createElement("div")
    divName.classList.add("div-name")

    let h2 = document.createElement("h2")
    h2.classList.add("title-2")
    if (user.name) {
        h2.innerText = `${user.name}`
    }else {
        h2.innerText = "Not identified"
    }

    let bio = document.createElement("span")
    bio.className = "color-white-op-50 text-2"
    if (user.bio) {
        if (user.bio.length > 25){
            bio.innerText = `${user.bio.substring(0, 25)}...`
        }else{
            bio.innerText = `${user.bio}`
        }
    }else {
        bio.innerText = "No bio description"
    }

    divName.append(h2, bio)

    divCard.append(divPicture, divName)

    return divCard
}

function createBtnsHeader(user) {
    const divBtns = document.createElement("div")
    divBtns.classList.add("btns-wrapper")

    let emailLink = document.createElement("a")
    emailLink.addEventListener("click", (event)=>{
        event.preventDefault()
    })

    let btnEmail = document.createElement("button")
    btnEmail.classList.add("btn-header")
    btnEmail.innerText = "E-mail"
    btnEmail.addEventListener("click", () => {
        if (user.email) {
            btnEmail.innerText = `${user.email}`
        }
    })

    emailLink.appendChild(btnEmail)

    let homePageLink = document.createElement("a")
    homePageLink.href = "../../pages/home/index.html"

    homePageLink.innerHTML = `
        <button class="btn-header">Trocar de usuário</button>
    `

    divBtns.append(emailLink, homePageLink)

    return divBtns
} 

function renderHeader(user) {
    const header = document.querySelector(".header-wrapper")
    header.innerHTML = ""

    header.append(createCardName(user), createBtnsHeader(user))
}

function createCardRepo(repo) {
    const li = document.createElement("li")
    li.classList.add("card-repo")

    let h3 = document.createElement("h3")
    h3.classList.add("title-3")
    if (repo.name) {
        if (repo.name.length > 25){
            h3.innerText = `${repo.name.substring(0, 25)}...`
        }else {
            h3.innerText = `${repo.name}`
        }
    }else {
        h3.innerText = "Repository not Identified"
    }

    let p = document.createElement("p")
    p.className = "text-3 color-white-op-60"
    if(repo.description) {
        if (repo.description.length > 120){
            p.innerText = `${repo.description.substring(0, 120)}...`
        }else {
            p.innerText = `${repo.description}`
        }
    }else {
        p.innerText = "No description"
    }

    let div = document.createElement("div")
    
    let repoLink = document.createElement("a")    
    repoLink.href = `${repo.html_url}`
    repoLink.target = "_blank"

    repoLink.innerHTML = `<button class="btn-card">Repositório</button>`

    let demoLink = document.createElement("a")
    if (repo.homepage){
        demoLink.href = `${repo.html_url}`
        demoLink.target = "_blank"
    }else {
        demoLink.addEventListener("click", (event)=>{
            event.preventDefault()
            alert("No demo website available")
        })        
    }

    demoLink.innerHTML = `<button class="btn-card">Demo</button>`

    div.append(repoLink, demoLink)

    li.append(h3, p, div)

    return li
}

function renderCard(arr) {
    const repoWrapper = document.querySelector(".repo-wrapper")
    repoWrapper.innerHTML = ""

    arr.forEach((elt) => repoWrapper.appendChild(createCardRepo(elt)))
}

document.getElementById("title-user").innerText = `${user.name}`
document.getElementById("favicon").href = `${user.avatar_url}`

renderHeader(user)
renderCard(repos)