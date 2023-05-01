import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
 username: {
    type: String,
    require: true,
    unique: true,
 },
 email: {
    type: String,
    require: true,
    unique: true,
 },
 password: {
    type: String,
    require: true,
 },
 phone: {
    type: String,
    require: true,
    unique: true,
 },
 country: {
    type: String,
    require: true,
 },
 isTasker: {
    type: Boolean,
    default: false,
 },
},{
    timestamps: true
});

export default mongoose.model("User", userSchema)