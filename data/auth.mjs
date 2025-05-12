import Mongoose, { version } from "mongoose";
import { useVirtualID } from "../db/database.mjs";
const userSchema = new Mongoose.Schema(
  {
    userid: { type: String, require: true },
    name: { type: String, require: true },
    email: { type: String, require: true },
    password: { type: String, require: true },
    url: String,
  },
  { versionKey: false }
);

useVirtualID(userSchema);
// Users로 만들어짐
const User = Mongoose.model("User", userSchema);

export async function createUser(user) {
  return new User(user).save().then((data) => data.id);
}

//아이디 찾기
export async function findByUserid(userid) {
  // next() 앞에꺼 실행 후 다음꺼 실행
  // return getUsers().find({ userid }).next().then(mapOptionalUser);
  return User.findOne({ userid });
}

export async function findByid(id) {
  // return getUsers()
  //   .find({ _id: new ObjectID(id) })
  //   .next()
  //   .then(mapOptionalUser);
  return User.findById(id);
}

// function mapOptionalUser(user) {
//   return user ? { ...user, id: user._id.toString() } : user;
// }

/*
git branch
git checkout -b session-auth:
*/
