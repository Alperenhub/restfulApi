//middleware bazı websitelerinde önce kayıt olun gibi karşımıza çıkan şeyleri oluşturduğumuz yer

const jwt = require('jsonwebtoken');

const auth = async(req,res,next) =>{
    try{
        const token = req.headers.authorization.split(" ")[1] //gelen iki kelimelik string'i array'e dönüştürüp işimize yarayacak elemanını(2. elemanını) seçtik
        let decodedData;

        if(token){
            decodedData = jwt.verify(token, process.env.SECRET_TOKEN)
        
            req.userId = decodedData?.id
        }else{
            decodedData = jwt.decode(token)

            req.userId = decodedData?.sub;
        }

        next()

    }catch(err){
        console.log(err)
    }

} 

module.exports = auth;