const express = require('express');
const router = express.Router();

const Payment = require('../models/payments');
const ufRequest = require('../UfTodayValue')

router.post('/payments', async (req, res) => {
  const { body } = req;
  const { id, name, lastName, description, serviceHour } = body
  const ufValue = await ufRequest()

  try {
    const newPayment = new Payment({
      id,
      name,
      lastName,
      description,
      serviceHour,
      amountOfService: ufValue * serviceHour,
      dayAmountUf: ufValue
    })
    await newPayment.save()
    res.status(201).json({message: 'Payment created'});
  }catch(err){
    console.error('an error on POST event ocurred', err)
    res.status(400).json({message: 'Bad request'})
  }
});

router.get('/payments/:id', async (req, res)=> {
  const { id } = req.params;
  try{
    const paymentFinded = await Payment.findOne({id: id});
    res.status(200).json({ message: 'payment finded', payment: paymentFinded });
  }catch(err){
    res.status(400).json({message: 'an error has ocurred on event find', err});
  }
});

router.get('/allPayments', async (req, res) => {
  const payments = await Payment.find();
  res.status(200).json(payments);
});

router.put('/payments/:id', async (req, res)=> {
  const { name, lastName, description, serviceHour } = req.body;
  const { id } = req.params;

  const ufValue = await ufRequest();
  const updatedPayment = { name, lastName, description, serviceHour, amountOfService: serviceHour*ufValue, dayAmountUf: ufValue };

  try{
    await Payment.findOneAndUpdate({id: id}, updatedPayment);
    res.status(200).json({ message: 'payment updated succesfully' });
  }catch(err){
    console.error('an error has ocurred on update event', err)
    res.status(400).json({message: 'Bad request'})
  }
});

router.delete('/payments/:id',async (req, res) => {
  const id = req.params.id;

  try{
    await Payment.findOneAndDelete({id: id})
    res.status(200).json({message: 'Payment deleted successfully'});
  }catch(err){
    console.error('an error has ocurred on delete event');
    res.status(400).json({message: 'Bad request'})
  }
});

module.exports = router;