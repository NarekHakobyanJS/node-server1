fetch('http://localhost:3003/api/users', {
    method : "POST",
    headers : {
        "Content-Type" : "application/json"
    },
    body : JSON.stringify({id : 1, name : "Varud"})
})