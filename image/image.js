const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey:process.env.API_CLARIFAI,
   });

const handleApi =(req,res)=>{
    app.models.
    predict(Clarifai.FACE_DETECT_MODEL,req.body.input)
    .then(data =>{
        res.json(data);
    })
    .catch(err =>res.status(400).json('Api pb'))
   
}
  


const handleImage=(req,res,postgres)=>{
    const {id}=req.body;
    console.log(id);
  postgres('users').where('id', '=', id)
  .increment('entries',1)
  .returning('entries')
  .then(entries=>{
      res.json(entries);
  })
  .catch(err=> res.status(400).json('unable to get enttries'))  

}

module.exports={
    handleImage,
    handleApi
}