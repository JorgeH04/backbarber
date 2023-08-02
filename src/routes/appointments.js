// const router = require('express').Router();
// const NewAppointment = require('../models/Appointment');
// const Users = require('../models/User');



// router.post('/appointment', async (req, res)=>{
//     console.log('makeing appointment')

//     const appointmentExists = await NewAppointment.find({userID:req.body.userID}) // return array of objects
//     if(appointmentExists[0]) return res.send({error:'You already scheduled an appointment'})

//     const timeExists = await NewAppointment.find({appointmentKey:req.body.key}) // return array of objects
//     if(timeExists[0]) return res.send({error:'This appointment is already taken, choose another day or time'})

//     const user = await Users.findOne({_id:req.body.userID})
//     if(!user) return res.send({error:'This user does not exist'})

//     let {userID, key, name, date, time, phone, day, timeInMS} = req.body

//     const newAppointment = new NewAppointment({   
//         userID,
//         appointmentKey:key,
//         name:user.name,
//         date,
//         time,
//         phone,
//         day,
//         timeInMS
//       })
//       newAppointment.save()

//       user.phone = phone
//       user.save()

//     res.status(200).send('Appointment scheduled successfully!')
// })



// router.post('/changeappointment', async (req, res)=>{
//   console.log('changing appointment')

//   const appointmentExists = await NewAppointment.find({userID:req.body.userID}) // return array of objects
//   if(!appointmentExists[0]) return res.send({error:'Appointment not found'})

//   let {key, date, time, day, timeInMS} = req.body

//   appointmentExists[0].appointmentKey = key
//   appointmentExists[0].date = date
//   appointmentExists[0].time = time
//   appointmentExists[0].day = day
//   appointmentExists[0].timeInMS = timeInMS

//   appointmentExists[0].save()
//   res.status(200).send('appointment changed!')
// })


// router.get('/userappointment', async(req, res) =>{

//   const appointmentExists = await NewAppointment.find({userID:req.query.id}) // return array of objects
//   if(!appointmentExists[0]) return res.send({error:'Appointment not found'})

//   console.log('user appointment')

//   let obj = {}
//   obj.day = appointmentExists[0].day
//   obj.time = appointmentExists[0].time
//   obj.date = appointmentExists[0].date
  
//   res.send(obj)

// })

// router.get('/getappointments', async(req, res) => {

//   console.log('get appointments')
//   const appointmentExists = await NewAppointment.find().sort({ _id: -1 }) // return array of objects
//   if(!appointmentExists[0]) return res.send({error:'You have no appointments'})

//   res.send(appointmentExists)
// })


// router.post('/cancelappointment', async(req, res) =>{

//   console.log('cancel appointment', req.body)

//   const appointmentExists = await NewAppointment.find({userID:req.body.id}) // return array of objects
//   if(!appointmentExists[0]) return res.send({error:'Appointment not found'})

//   try{
//     let deleteRes = await NewAppointment.deleteOne({_id:appointmentExists[0]._id})
//     console.log('deleteRes: ',deleteRes)

//   }catch(e){
//     console.log(e)
//   }



//   res.send('canceling appointment...')


// })

// router.get('/getusers', async(req, res) => {
//   console.log('get users')
//   const usersExists = await Users.find().sort({ _id: -1 })
//   if(!usersExists[0]) return res.send({error:'No Users'})

//   res.send(usersExists)

// })


// router.delete('/delete/:id', async (req, res, next) => {
//   const { id } = req.params;
//   await NewAppointment.deleteOne({_id: id});
//   //res.redirect('/');
// });

// module.exports = router;






const express = require('express');
const router = express.Router();
const appointmentsController = require('../controllers/appointments');

router.post('/appointment', appointmentsController.makeAppointment);

router.post('/changeappointment', appointmentsController.changeAppointment);

router.get('/userappointment', appointmentsController.getUserAppointment);

router.get('/getappointments', appointmentsController.getAppointments);

router.post('/cancelappointment', appointmentsController.cancelAppointment);

router.get('/getusers', appointmentsController.getUsers);

router.delete('/delete/:id', appointmentsController.deleteAppointment);

module.exports = router;