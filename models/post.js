const mongoose = require('mongoose')


const PostSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true, // bu özelliğin zorunlu olup olmadığını belirler. name: zorunlu dedik.
        trim: true //gereksiz boşlukları kaldırır.
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    stock: {
        type: Number,
        default: 0
    },
    date: {
        type: Date, 
        default: new Date()
    } //istersem url falan da verebilirim fotoğraf ekletebilmek için...
})

module.exports = mongoose.model('post', PostSchema)