const Auth = require('../models/auth.js')
const bcrypt = require('bcryptjs') //bcryptjs parolaları güvenli bir şekilde saklamak için yaygın olarak kullanılan hash'leme algoritması olan bcrypt'ı uygular.
const jwt = require('jsonwebtoken')

const register = async(req, res)=>{
    try{
        const {username, email, password} = req.body //req.body demek dışarıdan gelecek değer demek oluyo.
        const user= await Auth.findOne({email}) // kişinin girdiği e mail'i modeller içerisinde bul
        if(user){ //Eğer e mail hesabı zaten varsa aşağıdaki kodu bastır
            return res.status(500).json({message:"Bu e mail hesabı zaten kayıtlı"}) 
        }
        if(password.length <6){ //şifre 6 karakterden azsa
            return res.status(500).json({message:"Parolanız 6 karakterden küçük olamaz"}) 
        }

        const passwordHash = await bcrypt.hash(password, 12) //biz burada password'ü hashledik. 12 sayısı güvenlik derecesini gösterir. daha yüksek yazsak daha yüksek güvnelik olur ama performansı etkiler. O yüzden önerilen değer 10-12 aralığıdır.
        
        const newUser = await Auth.create({username, email, password: passwordHash}) //burada parantez içine yazdığımız verilere sahip bir user oluşturduk.

        const userToken = jwt.sign({id: newUser.id},process.env.SECRET_TOKEN, {expiresIn:'1h'}); //yeni oluşturduğum user'ın id numarasına göre token oluşturuyor. SECRET_TOKEN ise JWT'nin imzalanması için kullanılan bir key'dir. expiresin:'1h' ifadesi, geçerlilik süresinin bir saat olacağını gösterir. 

        res.status(201).json({
            status:"OK",
            newUser,
            userToken
        })
    } catch(error){
        return res.status(500).json({message: error.message})

    }
}


const login = async(req, res)=>{
    try{
        const {email, password} = req.body;
        const user = await Auth.findOne({email}); //Email kayıtlı mı diye kontrl ediyoruz
        if(!user){
            return res.status(500).json({message:"Böyle bir kullanıcı bulunamadı"})
        }
        const comparePassword = await bcrypt.compare(password, user.password) //kişinin bana verdiği password'ü bcrypt ile kıyaslamam lazım
        if(!comparePassword){
            return res.status(500).json({message:"Parolanız yanlış"})
        }
        const token = jwt.sign({id: user.id},process.env.SECRET_TOKEN, {expiresIn:'1h'}) //giriş yap

        res.status(200).json({
            status: "OK",
            user,
            token
        })

    } catch(error){
        return res.status(500).json({message:error.message})
    }
}

module.exports = {register,login}