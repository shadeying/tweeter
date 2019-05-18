"use strict";
const ObjectId = require("mongodb").ObjectID;
const bcrypt = require("bcrypt");

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  return {

    // Saves a tweet to `db`
    saveTweet: function(newTweet, callback) {
      db.collection("tweeter").insertOne(newTweet, (err,results) => {callback(null, true)});
    },

    // Get all tweets in `db`, sorted by newest first
    getTweets: function(callback) {
      const sortNewestFirst = (a, b) => a.created_at - b.created_at;
      db.collection("tweeter").find().toArray((err,results) => {callback(null, results.sort(sortNewestFirst))});
    },

    updateLikes: function(tweet, callback) {
      db.collection("tweeter").update( {"_id": ObjectId(tweet.id)}, { $set: { "like": tweet.like} }, (err,results) => {callback(null, true)});
    },

    createUser: function(data, callback){
      const handle = "@" + data.handle;
      const name = data.name;
      const password = data.password;
      const hashedPassword = bcrypt.hashSync(password, 10);
      const user = {user: {
        "name": name,
        "avatars": { "regular": "https://preview.redd.it/udxpo5xhyu811.jpg?width=960&crop=smart&auto=webp&s=d2e1870c7378d7d626c83f7c79a1f0cce0ea36e3"},
        "handle": handle,
        "password": hashedPassword
      }};
      db.collection("tweeter").insertOne(user, (err,results) => {callback(null, true)});
    },

    userLogin: function(data, callback){
      const handle = "@" + data.handle;
      const password = data.password;
      db.collection("tweeter").find({"user.handle": handle}).toArray((err, result) => {
        const userObject = result[0];
        if(bcrypt.compareSync(password, userObject.user.password)){
          callback(null, true);
        }else{
          callback(err);
        }
      });
    }

  };
}
