const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://127.0.0.1:27017/campground');

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: `65d68307019fdf401b2bad4f`,
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images: [
                {   
                url: 'https://res.cloudinary.com/dbyiarjq8/image/upload/v1708932496/YelpCamp/fhozfzcoo3rpdggv803o.jpg',
                filename: "YelpCamp/qcprfuhgtmn6d1wqg0me"
                },
                {   
                url: "https://res.cloudinary.com/dbyiarjq8/image/upload/v1708932496/YelpCamp/wgheakoegzwbpahs78i9.jpg",
                filename: "YelpCamp/wgheakoegzwbpahs78i9",
                }
            ],
            price: price
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})