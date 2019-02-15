let mongoose = require('mongoose')
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId
let schemaName = "Entry"

let schema = new Schema({
  name: { type: String, required: true },
  members: [{ type: ObjectId, ref: "User" }],
  winMatches: [{ type: String }],
  lossMatches: [{ type: String }],
  dblLossMatches: [{ type: String, default: "first loss" }],
  tournamentId: { type: ObjectId, ref: 'Tournament', required: true },
  standing: { type: String },
  seed: { type: Number }
})


module.exports = mongoose.model(schemaName, schema)