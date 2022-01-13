const db = require("../config/connection");
const { Post, User } = require("../models");

const postData = require("./postData.json");
const userSeeds = require("./userSeeds.json");

db.once("open", async () => {
  try {
    // clean database
    await Post.deleteMany({});
    await User.deleteMany({});
    await Post.create(postData);
    await User.create(userSeeds);

    // bulk create each model
    // const posts = await Post.insertMany(postData);
    // const users = await User.insertMany(userSeeds);

    // for (newClass of classes) {
    //   // randomly add each class to a school
    //   const tempSchool = schools[Math.floor(Math.random() * schools.length)];
    //   tempSchool.classes.push(newClass._id);
    //   await tempSchool.save();

    //   // randomly add a professor to each class
    //   const tempProfessor =
    //     professors[Math.floor(Math.random() * professors.length)];
    //   newClass.professor = tempProfessor._id;
    //   await newClass.save();

    //   // reference class on professor model, too
    //   tempProfessor.classes.push(newClass._id);
    //   await tempProfessor.save();

    //   for (let i = 0; i < postData.length; i++) {
    //     const { _id, postAuthor } = await Post.create(postData[i]);
    //     const user = await User.findOneAndUpdate(
    //       { username: postAuthor },
    //       {
    //         $addToSet: {
    //           posts: _id,
    //         },
    //       }
    //     );
    //   }
    // }

    console.log("all done!");
    process.exit(0);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
});
