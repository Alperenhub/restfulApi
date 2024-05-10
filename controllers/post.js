const PostSchema = require('../models/post.js')


const createPosts = async(req,res) =>{
    try{
        const newPost = await PostSchema.create(req.body); //PostSchema üzerinden dışarıdan gelen istek ile(req.body) bir post oluştur(create et) 
        res.status(201).json({
            newPost
        })
    }catch(err){
        return res.status(500).json({message: err.message})
    }
}

const getPosts = async(req,res) =>{
    try{
        const getPosts = await PostSchema.find(req.body); 
        res.status(200).json({
            newPost
        })
    }catch(err){
        return res.status(500).json({message: err.message})
    }
}

const getDetail = async(req,res) =>{
    try{
        const {id} = req.params;
        const detailPost = await PostSchema.findById(id);  
        res.status(200).json({
            detailPost
        })
    }catch(err){
        return res.status(500).json({message: err.message})
    }
}

const getUpdate = async(req,res) =>{
    try{
        const {id} = req.params;
        const updatePost = await PostSchema.findByIdAndUpdate(id, req.body, {new:true}); //PostSchema üzerinden dışarıdan gelen istek ile(req.body) Id'sine göre update et. 
        res.status(201).json({
            updatePost
        })
    }catch(err){
        return res.status(500).json({message: err.message})
    }
}

const deletePost = async(req,res) =>{
    try{
        const {id} = req.params;
         await PostSchema.findByIdAndRemove(id); 
        res.status(201).json({
            message:"Silme işleminiz başarılı"
        })
    }catch(err){
        return res.status(500).json({message: err.message})
    }
}

//search olayı için

const searchPost = async (req, res) =>{
    
    const {search, tag} = req.query; //query üzerinden alacağız mesela: furkanalperenkilinc?search=bulut&&yagmur bir query'dir
    try{
        const title = new RegExp(search,"i"); //regular expression, belirli kalıpları aramak, eşleşen metinleri bulmak veya metni belirli kurallara göre değiştirmek için kullanılır. 

        const post = await PostSchema.find({$or: [{title}],tag:{$in: tag.split(",")}}) //"or" mongodb sorgu koşullarını ifade eder.

        res.status(200).json({
                post
        })

    }catch(err){
        return res.status(500).json({message: error.message})
    }

}

module.exports = {createPosts, getDetail, getPosts, getUpdate, deletePost, searchPost}