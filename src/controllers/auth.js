const NewUser = require('../models/User');
const key = 'real secret keys should be long and random';
const encryptor = require('simple-encryptor')(key);

const getHi = async (req, res) => {
  res.send('hi from the server');
};

const registerUser = async (req, res) => {
  let { nombre, email, pass, confirmPass } = req.body;

  console.log('register data: ', req.body);
  const userExists = await NewUser.find({ email: req.body.email });
  if (userExists[0]) return res.send({ error: 'Este usuario ya existe' });

  if (pass !== confirmPass) return res.send({ error: 'Las contraseñas no coinciden' });

  let username = email.substring(0, email.indexOf('@'));

  const newUser = new NewUser({
    email: email,
    password: pass,
    name: nombre
  });

  newUser.save();
  res.status(200).send('success');
};

const loginUser = async (req, res) => {
  let { email, pass } = req.body;
  console.log('login data: ', req.body);
  const userExists = await NewUser.find({ email: email });
  if (!userExists[0]) return res.send({ error: 'Sorry user not found' });

  if (pass !== userExists[0].password) return res.send({ error: 'Contraseña equivocada' });

  let username = email.substring(0, email.indexOf('@'));
  let userPhone = 'phone...';
  if (userExists[0].phone) userPhone = userExists[0].phone;

  res.send({
    id: userExists[0]._id,
    status: 'logged',
    name: username,
    admin: email.includes('admin'),
    phone: userPhone
  });
};

module.exports = {
  getHi,
  registerUser,
  loginUser
};