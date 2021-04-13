const express = require("express")
const server = express()
const routes = require("./routes")
const path = require("path")
const port = process.env.PORT||3000

// habilitar template engine
server.set("view engine", "ejs")

// mudar a localização da pasta views
server.set("views", path.join(__dirname, "views"))

// habilitar arquivos statics
server.use(express.static("public"))

// habilitar o request.body
server.use(express.urlencoded({ extended: true }))

// routes
server.use(routes)

server.listen(port, () => console.log('rodando...'))