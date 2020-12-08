const express = require('express');
const cors = require('cors');
const { env } = require('process');
const db = require('./database/db');
const expressValdator=require('express-validator');
var expressSession = require('express-session');
const app = express();

app.use(cors());
app.use(express.json());

app.use(expressSession({secret:'max',saveUninitialized:false,resave:false}));


// middlewares
const route = require('./routes/teacher');
const insRoute = require('./routes/institute');
const stdntRoute = require('./routes/student');
const courseRoute = require('./routes/course');
const subjectRoute = require('./routes/subject');
// middlewares

//router
app.use('/teacher', route);
app.use('/institute', insRoute);
app.use('/student', stdntRoute);
app.use('/course', courseRoute);
app.use('/subject', subjectRoute);
//router




// server Started
const Port = process.env.PORT || 3000;
app.listen(Port, () => {
	console.log('express is running at ' + Port);
})
