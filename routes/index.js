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

router.post('/new', (req, res, next) => {
  const formData = req.body;
  const { message: text, name: user } = formData;
  messages.push({
    text, user, added: new Date(), img: jdenticon.toSvg(user, 200),
  });
  res.redirect('/');
});

module.exports = router;
