const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const path = require('path');

const Appointment = require('./models/Appointment'); // Імпорт моделі з окремого файлу
const JobApplication = require('./models/JobApplication');
const Review = require('./models/Review');
const SpecialBooking = require('./models/SpecialBooking');

const app = express();
const PORT = 3000;


// Підключення до MongoDB
mongoose.connect(
  'mongodb+srv://karinalozinska:marr252zxcv@cluster0.e0uu4wq.mongodb.net/beauty_salon?retryWrites=true&w=majority&appName=Cluster0',
  { useNewUrlParser: true, useUnifiedTopology: true }
)
.then(() => console.log('✅ Підключено до MongoDB'))
.catch(err => console.error('❌ Помилка підключення до MongoDB:', err));

// 2. Middleware
app.use(cors());
app.use(express.json());

app.post('/api/appointments', async (req, res) => {
  try {
    const newAppointment = new Appointment(req.body);
    await newAppointment.save();
    res.status(201).json({ message: 'Appointment saved' });
  } catch (error) {
    console.error('❌ Помилка збереження запису:', error);
    res.status(500).json({ error: 'Error saving appointment' });
  }
});

app.post('/api/job-application', async (req, res) => {
  try {
    const application = new JobApplication(req.body);
    await application.save();
    res.status(201).json({ message: 'Application saved' });
  } catch (error) {
    console.error('❌ Помилка збереження заявки:', error);
    res.status(500).json({ error: 'Помилка при збереженні заявки' });
  }
});

app.post('/api/reviews', async (req, res) => {
  try {
    const { name, message, rating } = req.body;
    const review = new Review({
      name,
      message,
      rating,
    });

    await review.save();
    res.status(201).json({ message: 'Відгук збережено' });
  } catch (error) {
    console.error('❌ Помилка збереження відгуку:', error);
    res.status(500).json({ error: 'Помилка при збереженні відгуку' });
  }
});

app.post('/api/bookings', async (req, res) => {
  try {
    const { name, phone, email, datetime } = req.body;

    if (!name || !phone || !email || !datetime) {
      return res.status(400).json({ error: 'Усі поля обов’язкові' });
    }

    const booking = new SpecialBooking({ name, phone, email, datetime });
    await booking.save();

    res.status(201).json({ message: '✅ Запис успішно збережено!' });
  } catch (err) {
    console.error('❌ Помилка при збереженні запису:', err);
    res.status(500).json({ error: 'Внутрішня помилка сервера' });
  }
});

app.use(express.static('public'));

app.listen(PORT, () =>
  console.log(`✅ Сервер запущено на http://localhost:${PORT}`)
);