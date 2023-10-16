const mongoose = require('mongoose');
const jdenticon = require('jdenticon');

const { Schema } = mongoose;

const GeneralSchema = new Schema({
  text: { type: String, required: true, maxLength: 500 },
  user: { type: String, required: true, maxLength: 100 },
  added: { type: Date, required: true },
});

GeneralSchema.virtual('jdenticon').get(function () {
  return jdenticon.toSvg(this.user, 200);
});

module.exports = mongoose.model('General', GeneralSchema);
