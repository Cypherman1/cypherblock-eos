const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const voterSchema = new Schema({
  owner: String,
  proxy: String,
  producers: [{type: String}],
  staked: Number,
  last_vote_weight: String,
  proxied_vote_weight: String,
  is_proxy: Number,
  flags1: Number,
  reserved2: Number,
  reserved3: String
});

module.exports = mongoose.model('Voter', voterSchema);
