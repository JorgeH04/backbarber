const NewAppointment = require('../models/Appointment');
const Users = require('../models/User');

const makeAppointment = async (req, res) => {
  console.log('making appointment');

  const appointmentExists = await NewAppointment.find({ userID: req.body.userID });
  if (appointmentExists[0]) return res.send({ error: 'You already scheduled an appointment' });

  const timeExists = await NewAppointment.find({ appointmentKey: req.body.key });
  if (timeExists[0]) return res.send({ error: 'This appointment is already taken, choose another day or time' });

  const user = await Users.findOne({ _id: req.body.userID });
  if (!user) return res.send({ error: 'This user does not exist' });

  let { userID, key, name, date, time, phone, day, timeInMS } = req.body;

  const newAppointment = new NewAppointment({
    userID,
    appointmentKey: key,
    name: user.name,
    date,
    time,
    phone,
    day,
    timeInMS
  });

  newAppointment.save();

  user.phone = phone;
  user.save();

  res.status(200).send('Appointment scheduled successfully!');
};

const changeAppointment = async (req, res) => {
  console.log('changing appointment');

  const appointmentExists = await NewAppointment.find({ userID: req.body.userID });
  if (!appointmentExists[0]) return res.send({ error: 'Appointment not found' });

  let { key, date, time, day, timeInMS } = req.body;

  appointmentExists[0].appointmentKey = key;
  appointmentExists[0].date = date;
  appointmentExists[0].time = time;
  appointmentExists[0].day = day;
  appointmentExists[0].timeInMS = timeInMS;

  appointmentExists[0].save();
  res.status(200).send('Appointment changed!');
};

const getUserAppointment = async (req, res) => {
  const appointmentExists = await NewAppointment.find({ userID: req.query.id });
  if (!appointmentExists[0]) return res.send({ error: 'Appointment not found' });

  console.log('user appointment');

  let obj = {};
  obj.day = appointmentExists[0].day;
  obj.time = appointmentExists[0].time;
  obj.date = appointmentExists[0].date;

  res.send(obj);
};

const getAppointments = async (req, res) => {
  console.log('get appointments');
  const appointmentExists = await NewAppointment.find().sort({ _id: -1 });
  if (!appointmentExists[0]) return res.send({ error: 'You have no appointments' });

  res.send(appointmentExists);
};

const cancelAppointment = async (req, res) => {
  console.log('cancel appointment', req.body);

  const appointmentExists = await NewAppointment.find({ userID: req.body.id });
  if (!appointmentExists[0]) return res.send({ error: 'Appointment not found' });

  try {
    let deleteRes = await NewAppointment.deleteOne({ _id: appointmentExists[0]._id });
    console.log('deleteRes: ', deleteRes);
  } catch (e) {
    console.log(e);
  }

  res.send('Canceling appointment...');
};

const getUsers = async (req, res) => {
  console.log('get users');
  const usersExists = await Users.find().sort({ _id: -1 });
  if (!usersExists[0]) return res.send({ error: 'No Users' });

  res.send(usersExists);
};

const deleteAppointment = async (req, res, next) => {
  const { id } = req.params;
  await NewAppointment.deleteOne({ _id: id });
  // res.redirect('/');
};

module.exports = {
  makeAppointment,
  changeAppointment,
  getUserAppointment,
  getAppointments,
  cancelAppointment,
  getUsers,
  deleteAppointment
};