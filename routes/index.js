const express = require('express');

const router = express.Router();

const jdenticon = require('jdenticon');

const messages = [
  {
    text: 'Hi there',
    user: 'Amando',
    added: new Date(),
    img: jdenticon.toSvg('Amando', 200),
  },
  {
    text: 'Hello World!',
    user: 'Charles',
    added: new Date(),
    img: jdenticon.toSvg('Charles', 200),
  },
];

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Mini Messageboard', msgArr: messages });
});

module.exports = router;
