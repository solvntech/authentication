import * as mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }
});

UserSchema.pre('save', async function(next) {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(this.password, salt);

        this.password = hashedPass;
        next();
    } catch (e: any) {
        next(e);
    }
});

UserSchema.methods.isValidPassword = async function(password: string) {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (e) {
        throw e;
    }
}

export const User = mongoose.model('user', UserSchema);
