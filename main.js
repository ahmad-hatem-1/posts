
function lis_click() {
    let lis = document.querySelectorAll('.users ul li');
    lis[0].classList.add("active")
    // console.log(lis)
    lis.forEach(e => {
        e.addEventListener('click', function () {
            lis.forEach(r => {
                r.classList.remove("active")
            })
            e.classList.add("active")
        })
    })

}
function getpost(id) {
    let posts_ul = document.getElementById("posts_ul")
    posts_ul .style.cssText = `filter: blur(10px);`
    let request = new XMLHttpRequest()
    request.open("GET", `https://jsonplaceholder.typicode.com/posts?userId=${id||1}`)
    request.responseType = "json"
    request.send()
    request.onload = _ => {
        if (request.status >= 200 && request.status < 300) {
            posts_ul.innerHTML = ""
            for (items of request.response) {
                posts_ul.innerHTML += `
                 <li>
            <h2>${items.title}</h2>
            <hr>
            <p>${items.body}</p>
            </li>
            `
        }
        console.log(request.response[0])
            posts_ul.style.cssText = `filter: blur(0px);`
        }
    }
}
getpost()
function get_user (){  
              let users = document.getElementById("users_ul")
    let request = new XMLHttpRequest()
    request.open("GET", "https://jsonplaceholder.typicode.com/users")
    request.responseType = "json"
    request.send()
    request.onload = _ => {
    if (request.status >= 200 && request.status < 300) {
        
            for (let i = 0 ; i < request.response.length ; i++) {
                users.innerHTML += `
                <li onclick="getpost(${request.response[i].id})">
                <h5>${request.response[i].username}</h5>
                <p>${request.response[i].email}</p>
                 </li>
                
                `
            
            }
            lis_click() 
    }
}

}
get_user ()