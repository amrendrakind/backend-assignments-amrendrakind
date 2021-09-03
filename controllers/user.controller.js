
import User from "../models/user.model.js";

export const newUser = async (req, res) => {
    try {
      const newuser = new User(req.body);
      newuser.save();
      res.send(newuser);
    } catch (err) {
      res.send({ message: err.message });
    }
  }

export default newUser