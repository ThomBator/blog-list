const mongoose = require("mongoose");

//Defines schema for blog document type
const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  url: { type: String, required: true },
  //My goal with the construction of the votes part of the schema is to limit the number of votes each user can make.
  //Front-end logic will ensure that users can only hold a value of 1, 0 or -1 so that users can only upvote or downvote once essentially.
  votes: {
    totalVotes: { type: Number, required: true },
    users: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        vote: { type: Number, required: true },
      },
    ],
  },
  //Every comment must be associated with a logged in user, so associating a user with the comment here
  //I am aware that this might cause performance issues in a truly large app
  // In a bigger app I would make a separate collection just for the comments and have them associated back to each blog and user
  //May add at functionality here in future iterations
  comments: [
    {
      _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
      comment: { type: String, maxLength: 255 },
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

//Takes off __v because it is not needed
//Converts id to a string because string ids are more commonly used by different libraries and platforms

blogSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
