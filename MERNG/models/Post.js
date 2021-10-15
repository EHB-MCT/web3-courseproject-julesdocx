const { model, Schema } = require('mongoose');

const postSchema = new Schema({
    name: String,
    body: String,
    createdAt: String,
    username: String,
    comments: [
        {
            body: String,
            username: String,
            createdAt: String,
        }
    ],
    likes: [
        {
            username: String,
            createdAt: String,
        }
    ],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
});

module.exports = model('Post', postSchema);