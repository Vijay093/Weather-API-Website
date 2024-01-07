//jshint esversion: 6

const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.static("public"));


app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('index', { weatherData: null, error: null });
});

app.post('/', async (req, res) => {
    const city = req.body.city;
    const apiKey = process.env.API_KEY;
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await axios.get(apiUrl);
        const weatherData = response.data;
        res.render('index', { weatherData, error: null });
    } catch (error) {
        res.render('index', { weatherData: null, error: 'City not found' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
