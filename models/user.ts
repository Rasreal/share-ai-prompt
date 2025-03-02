import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
    email: {
        type: String,
        unique: [true, 'Email already exists'],
        required: [true, 'Email is required'],
    },
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: [true, 'Username already exists'],
        match: [
            /^(?=.{2,20}$)(?![_.])(?!.*[_.]{2})[\p{L}\d._]+(?<![_.])$/u,
            "Username invalid, it should contain 2-20 alphanumeric letters (or letters from any language), underscores, or periods and be unique!"
        ]
    },
    image: {
        type: String,
    }
});

const User = models.User || model("User", UserSchema);

export default User;
