const express = require('express')
const app = express()
const port = 3011
const multer = require('multer')
const path = require('path')

const myarr = []

app.use(express.json())


app.get('/', (req, res) => {
  res.send('Hello World!')
})

const storage = multer.diskStorage({
    destination : './upload/images',
    filename :(req,file,cb)=>{
        return cb(null,`${file.fieldname}_${Date.now()}_${path.extname(file.originalname)}`)
    }
})


const upload = multer({storage})

app.use('/profile',express.static('upload/images'))




app.post("/upload",upload.single('profile'),(req,res)=>{
    const data = res.json({
        success : 100,
        profile_url : `http://localhost:${port}/profile/${req.file.filename}`
    })   
    myarr.push({...data})
})

app.get("/upload",(req,res)=>{
    res.send(myarr)
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
