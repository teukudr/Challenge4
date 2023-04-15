const { Mobil } = require("../models");
const upload = require("../middleware/middleware");
const {Op} = require('sequelize')

class database {
  #id;
  #name_mobil;
  #size_mobil;
  #photo_mobil;
  #rent_mobil;
  constructor(host, user, password, database, dialect) {
    this.host = host;
    this.user = user;
    this.password = password;
    this.database = database;
    this.dialect = dialect;
  }

  create(param) {
    Mobil.create({
      name_mobil: param.body.name,
      rent_mobil: param.body.rent,
      size_mobil: param.body.size,
      photo_mobil: `/img/${param.file.filename}`,
    }).then((mobil) => {
      console.log(mobil);
    });
  }

  update(param) {
    Mobil.update(
      {
        name_mobil: param.body.name,
        rent_mobil: param.body.rent,
        size_mobil: param.body.size,
        photo_mobil: `/img/${param.file.filename}`,
      },
      { where: { id: param.params.id } }
    )
      .then(() => {
       return "Mobil Berhasil diupdate";
      })
      .catch((err) => {
        throw err
      });
  }

  async getAll() {
    const message = "Tidak ada data mobil"
    let cars=[]
    await Mobil.findAll({order:[['name_mobil','ASC'],]}).then((mobil) => {
       let vessel=JSON.stringify(mobil)
       cars = JSON.parse(vessel)
    }).catch(err => message);
    if(cars != null){
    return cars
  }else{
    return {message:message}
  }
  }

  async getAllSearched(param) {
    const message = "Tidak ada data mobil"
    let cars=[]
    await Mobil.findAll({where:{
name_mobil : param}}).then((mobil) => {
       let vessel=JSON.stringify(mobil)
       cars = JSON.parse(vessel)
       console.log(cars)
    }).catch(err => message);
    if(cars != null){
    return cars
  }else{
    return {message:message}
  }
  }

  async getOne(param) {
    let cars
    await Mobil.findOne({
      where: { id: param },
    }).then((mobil) => {
      let vessel = JSON.stringify(mobil)
      cars = JSON.parse(vessel)
    });
    if(cars!=null){
    return cars
  }else{
    return {message:"Data tidak ditemukan"}
  }
  }

  drop(param) {
    Mobil.destroy({
      where: { id: param },
    }).then(() => console.log("Mobil Berhasil dihapus"));
  }
}

const db = new database(
  "localhost",
  "postgres",
  "123456",
  "binarcarrental",
  "postgres"
);

module.exports = { db };
