const mongoose = require('mongoose');
const jdenticon = require('jdenticon');
const formatDistanceToNow = require('date-fns/formatDistanceToNow');

const { Schema } = mongoose;

const GeneralSchema = new Schema({
  text: { type: String, required: true, maxLength: 500 },
  user: { type: String, required: true, maxLength: 100 },
  added: { type: Date, required: true },
});

GeneralSchema.virtual('jdenticon').get(function () {
  return jdenticon.toSvg(this.user, 200);
});

GeneralSchema.virtual('displayDate').get(function () {
  const disp = formatDistanceToNow(this.added);
  return `${disp[0].toUpperCase() + disp.slice(1)} ago`;
});

module.exports = mongoose.model('General', GeneralSchema);
