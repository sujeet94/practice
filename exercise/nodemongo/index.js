const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const logger = require('./log');
const morgan = require('morgan');
const courses = require('./courses');
const login = require('./routes/login')

const app = express();
app.use(express.json());
// app.use(logger);
app.use(helmet());
app.use(morgan('tiny'));
app.use('/courses', courses);
app.use('/login', login)
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`app started on ${port}`);
});

mongoose.connect('mongodb://localhost/mongo-exercises', { useNewUrlParser: true })
    .then(() => {
        console.log('connected');
    })
    .catch(err => {
        console.log(err);
    });

app.get('/', (req, res) => {
    res.send("abc");
});

// app.post('/save', (req, res) => {

//     res.send("abc");
// });
const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: { type: Date, default: Date.now },
    isPublished: Boolean,
    price: Number,
});

const Course = mongoose.model('course', courseSchema);


async function createCourse() {

    const course = new Course({
        name: 'angular js',
        author: 'sujeet',
        tags: ['javascript', 'frontend'],
        isPublished: true,
        price: 15
    });
    const result = await course.save();
    console.log(result);
};

async function getCourse() {

    const courses = await Course.find()
        .or({ price: { $gte: 15 } }, { name: /.*by.*/i })
        .select({ name: 1, author: 1 })

    return courses;
};
// createCourse();
getCourse().then((courses) => {
    console.log(courses);
})
    .catch(err => {
        console.log(`error ${err} `)
    });