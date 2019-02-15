let mongoose = require('mongoose')
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId
let schemaName = "Tournament"



let schema = new Schema({
  title: { type: String, required: true },
  style: { type: String, required: true },
  description: { type: String, required: true },
  owner: { type: ObjectId, ref: 'User' },
  entrycode: { type: String, required: true, unique: true },
  entryId: [{ type: ObjectId, ref: 'Entry' }],
  entries: [],
  loserBracket: [],
  bracket: {},
  archived: { type: Boolean, default: false },
  enrollment: { type: Boolean, default: true }
})


module.exports = mongoose.model(schemaName, schema)