import User from "../models/user.model.js";

export const becomeTasker = async (req, res) => {
    const user = await User.findById(req.userId );
    console.log(user)
    user.isTasker = true;
    user.save();




    return res.send("BLA BLA")
}