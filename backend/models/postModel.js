const mongoose = require('mongoose')
const postSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    text:{
        type: String,
        required: [true,'Please add atext']
    },
},
{
    timestamps: true,
}
)

module.exports = mongoose.model('Post', postSchema)