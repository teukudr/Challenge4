const Joi = require('joi'); 
const middleware = (schema, property) => { 
  return (req, res, next) => { 
    let name=req.body.name
    let rent=req.body.rent
    let size=req.body.size
    let photo= req.hasOwnProperty('file') ? req.file.filename : null
  const { error } = schema.validate({name:name,rent:rent,size:size,photo:photo});
  const valid = error == null; 
  if (valid) { 
    next(); 
  } else { 
    const { details } = error; 
    const message = details.map(i => i.message).join(',');
    //console.log("error", message);
    if(req.get('insomnia')) {
        res.status(422).json({message:message})
    }else{
   res.status(422).redirect('/?message=Data Gagal Ditambahkan, pastikan data yang Anda input tidak kosong, silakan coba kembali')}
 } 
  } 
} 
module.exports = middleware;