import Express from "express";


const app = Express()
const PORT = process.env.PORT || 8080

app.use(Express.json())
app.use(Express.urlencoded({extended: true}))

app.listen(PORT, err => {
    err ? console.log("Error." + err) : console.log("listen on port " + PORT)
})