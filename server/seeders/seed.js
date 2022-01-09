const db = require("../config/connection");
const { School, Class, Professor, Post, User } = require("../models");

const schoolData = require("./schoolData.json");
const classData = require("./classData.json");
const professorData = require("./professorData.json");
const postData = require("./postData.json");
const userSeeds = require("./userSeeds.json");

db.once("open", async () => {
  try {
    // clean database
    await School.deleteMany({});
    await Class.deleteMany({});
    await Professor.deleteMany({});
    await Post.deleteMany({});
    await User.deleteMany({});
    await Post.create(postData);
    await User.create(userSeeds);

    // bulk create each model
    const schools = await School.insertMany(schoolData);
    const classes = await Class.insertMany(classData);
    const professors = await Professor.insertMany(professorData);
    const posts = await Post.insertMany(postData);
    const users = await User.insertMany(userSeeds);

    for (newClass of classes) {
      // randomly add each class to a school
      const tempSchool = schools[Math.floor(Math.random() * schools.length)];
      tempSchool.classes.push(newClass._id);
      await tempSchool.save();

      // randomly add a professor to each class
      const tempProfessor =
        professors[Math.floor(Math.random() * professors.length)];
      newClass.professor = tempProfessor._id;
      await newClass.save();

      // reference class on professor model, too
      tempProfessor.classes.push(newClass._id);
      await tempProfessor.save();

      for (let i = 0; i < postData.length; i++) {
        const { _id, postAuthor } = await Post.create(postData[i]);
        const user = await User.findOneAndUpdate(
          { username: postAuthor },
          {
            $addToSet: {
              posts: _id,
            },
          }
        );
      }
    }
  } catch (err) {
    console.log(err);
    process.exit(1);

    console.log("all done!");
    process.exit(0);
  }
});
