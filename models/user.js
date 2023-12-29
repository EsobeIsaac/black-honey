import {Schema, model, models} from 'mongoose';

const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Please specify a name'],
    },
    email: {
        type: String,
        unique: [true, 'Email already exist'],
        required: [true, 'Please specify email']
    },
    image: {
        type: String
    }
})

const User = models.User || model('User', UserSchema);

export default User