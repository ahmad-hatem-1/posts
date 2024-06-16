
let users = document.getElementById("users_ul")
let posts_ul = document.getElementById("posts_ul")
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
function posts(userId) {
    posts_ul.style.cssText = `filter: blur(10px);`
    fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId || 1}`)
        .then(response => {
            if (response.ok) {
                return response.json()
            }
        }).then(data => {
            posts_ul.style.cssText = `filter: blur(0px);`

            posts_ul.innerHTML = ""
            for (items of data) {
                posts_ul.innerHTML += `
            <li>
                <h2>${items.title}</h2>
                <hr>
                <p>${items.body}</p>
            </li>
            `
            }
        })
}
new Promise((resolve, reject) => {
    fetch("https://jsonplaceholder.typicode.com/users")
        .then(response => {
            if (response.ok) {
                return response.json()
            }
            else (
                reject("error")
            )
        })
        .then(data => {
            for (let i = 0; i < data.length; i++) {
                users.innerHTML += `
        <li onclick="posts(${data[i].id})">
        <h5>${data[i].username}</h5>
        <p>${data[i].email}</p>
        </li>
        `
                lis_click()
            }
            resolve(userId = 1)
        })
}).then(_ => {
    posts()
}).catch(error => {
    alert(error)
})