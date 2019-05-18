"use strict";
const ObjectId = require("mongodb").ObjectID;

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
    }

  };
}
