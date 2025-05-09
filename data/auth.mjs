import MongoDb from "mongodb";
import { getUsers } from "../db/database.mjs";
const ObjectID = MongoDb.ObjectId;
export async function createUser(user) {
  return getUsers()
    .insertOne(user)
    .then((result) => result.insertedId.toString());
}

export async function login(userid, password) {
  const user = users.find(
    (user) => user.userid === userid && user.password === password
  );
  return user;
}

//아이디 찾기
export async function findByUserid(userid) {
  // next() 앞에꺼 실행 후 다음꺼 실행
  return getUsers().find({ userid }).next().then(mapOptionalUser);
}

export async function findByid(id) {
  return getUsers()
    .find({ _id: new ObjectID(id) })
    .next()
    .then(mapOptionalUser);
}

function mapOptionalUser(user) {
  return user ? { ...user, id: user._id.toString() } : user;
}

/*
git branch
git checkout -b session-auth:
*/
