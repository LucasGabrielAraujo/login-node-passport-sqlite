const { db } = require("./db.controller");
const { json } = require("body-parser")

const login = (req, res) => {
    const username = req.body.username;
    const pass = req.body.password

    const verificado = verificar(username, pass);
}

function verificar(username, pass){
    let res=db.run(`SELECT * FROM "users" WHERE username = ${username} AND password = ${pass} `);
    if (res.username = username) {
        console.log(encontrado)
    }else{error}
}
db.close()
module.exports={login}