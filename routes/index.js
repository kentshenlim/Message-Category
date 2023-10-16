const express = require('express');
const GeneralModel = require('../models/general');

const router = express.Router();

/* Aggregation pipeline for pagination */
const maxResPerPage = 10;
function getAgg(pageIdx) {
  const agg = [
    { $match: {} },
    { $sort: { added: -1 } },
    { $skip: maxResPerPage * pageIdx },
    { $limit: maxResPerPage },
  ];
  return agg;
}

/* GET home page. */
router.get('/', async (req, res, next) => {
  let { pageIdx } = req.query;
  if (!pageIdx) pageIdx = 0;
  pageIdx = +pageIdx;
  const totalDocCount = await GeneralModel.countDocuments();
  const maxPageIdx = Math.floor((totalDocCount - 1) / maxResPerPage);
  if (pageIdx > maxPageIdx) res.redirect(`/?pageIdx=${maxPageIdx}`); // If user sets high pageIdx in URL
  const msgArrDehydrated = await GeneralModel.aggregate(getAgg(pageIdx));
  // Need to hydrate if using aggregation, to add back defined virtuals
  // Otherwise, specify virtuals during aggregation rather than in schema
  // Here the first approach was used because virtuals have been defined in schema
  // See https://github.com/Automattic/mongoose/issues/8345#issuecomment-554647197
  const msgArrHydrated = msgArrDehydrated.map((doc) => GeneralModel.hydrate(doc));
  res.render('index', {
    title: 'Mini Messageboard', msgArr: msgArrHydrated, pageIdx, maxPageIdx,
  });
});

router.post('/new', async (req, res, next) => {
  const formData = req.body;
  const { message: text, name: user } = formData;
  await GeneralModel.create({
    text, user, added: new Date(),
  });
  res.redirect('/');
});

module.exports = router;
