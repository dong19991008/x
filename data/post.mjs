import Mongoose from "mongoose";
import * as UserRepository from "./auth.mjs";
import { useVirtualID } from "../db/database.mjs";

const postSchema = new Mongoose.Schema(
  {
    userid: { type: String, require: true },
    name: { type: String, require: true },
    url: String,
    text: { type: String, require: true },
    userId: { type: String, require: true },
  },
  { timestamps: true }
);

useVirtualID(postSchema);

const Post = Mongoose.model("Post", postSchema);

//모든 포스트를 리턴
export async function getALL() {
  return Post.find().sort({ createAt: -1 });
}

// 사용자 아이다(userid)에 대한 포스트를 리턴
// .filter:조건을 만족하는 모든 요소를 배열로 리턴
export async function getALLByUserid(userid) {
  return Post.find({ userid }).sort({ createAt: -1 });
}

//글 번호(id)에 대한 포스트를 리턴
// .find:조건을 만족하는 첫 번째 요소 하나를 리턴
export async function getByid(id) {
  return Post.findById(id);
}

// 포스트 작성
export async function create(text, userId) {
  return UserRepository.findByid(userId).then((user) =>
    new Post({
      userid: user.userid,
      name: user.name,
      userId,
      text,
    }).save()
  );
}

//포스트 변경
export async function update(id, text) {
  return Post.findOneAndUpdate(id, { text }, { returnDocument: "after" });
}

//포스트 삭제
export async function remove(id) {
  return Post.findByIdAndDelete(id);
}
