import {Schema, model, models} from 'mongoose';
const defaultImg = process.env.NEXT_PUBLIC_DEFAULT_IMAGE;

const PoemSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Please specify a poem title'],
    },
    body: {
        type: String,
        required: [true, 'Please specify a poem body']
    },
    postedOn: {
        type: Date,
        default: Date.now()
    },
    image: {
        type: String,
        default: defaultImg
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    category: {
        type: String,
        enum: ['love and relationship', 'inspiration and motivation', 'social commentary']
    },
    tags: {
        type: Array
    }
})

const Poem = models.Poem || model('Poem', PoemSchema);

export default Poem