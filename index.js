const {sequelize,db} = require("./config/database");
const express = require("express");
const path = require("path")
const app = express()
const bodyParser = require('body-parser')
const middleware= require("./middleware/middleware");
const upload = middleware.multer
//const cekHeader = middleware.cekHeader
const qs = require("querystring")
const port = 3000
const cors = require('cors')
const validation = require("./middleware/validation")
const schemas = require("./middleware/schemas")
app.use(cors())

app.use(bodyParser.json())
//set view engine
app.set('view engine', 'ejs');
//set folder tampilan
app.set('views', path.join(__dirname, 'resources'));
//set static file untuk css,image dan js
app.use(express.static('resources'))
app.use(express.json())

app.get('/addnewcar', (req, res) => {
  res.render('tambahcar')
})

app.get('/', async (req, res) => {
  const mobil = await db.getAll()
  if(req.get('insomnia')){
    res.status(200).json(mobil)
  }else{
  if(req.query.message){
  const message = req.query.message
  res.status(200).render('dashboard',{mobil,message})}else if(req.query.success){
  const message = req.query.success
  res.status(200).render('dashboard',{mobil,message})}else{
  res.status(200).render('dashboard',{mobil,message:null})
  }
}
})

app.get('/Car/', async (req, res) => {
  console.log(req.query.search)
  let mobil = await db.getAllSearched(req.query.search)
  res.status(200).json(mobil)
})

app.get('/Car/:id', async (req, res) => {
  const mobil = await db.getOne(req.params.id)
  if(req.get('insomnia')){
    res.status(200).json(mobil)}else{
  res.status(200).render('updatecar',{mobil})
}
})

app.post('/Car',  upload.single('photo'), validation(schemas.carPOST), (req, res) => {
  db.create(req)
  if(req.get('insomnia')){
    res.status(200).json({message:"Data Berhasil Ditambahkan"})
}else{
  res.status(200).redirect('/?message=Data Berhasil Ditambahkan')
}
})

app.put('/Car/:id', upload.single('photo'), validation(schemas.carPOST), (req, res) => {
  db.update(req)
  res.status(200).json({Message:'Data Berhasil Diupdate'})
  })

app.delete('/Car/:id', (req, res) => {
  db.drop(req.params.id)
  res.status(200).json({Message:'Data Berhasil Dihapus'})
  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
