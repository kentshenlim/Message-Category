const express = require('express');
const GeneralModel = require('../models/general');

const router = express.Router();

/* GET home page. */
router.get('/', async (req, res, next) => {
  const msgArr = await GeneralModel.find();
  res.render('index', { title: 'Mini Messageboard', msgArr });
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
