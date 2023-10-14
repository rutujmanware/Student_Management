const express = require('express')
const app = express()
const mongoDB = require('./db');
require('dotenv').config();

app.use((req,res,next) => {
    res.setHeader("Access-Control-Allow-Origin","http://localhost:3000");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-requested-With, Content-Type, Accept"
    );
    next();
  })

mongoDB();


app.use(express.json())
app.get('/', (req, res) => {
    res.send('Hello World!')
  })
app.use('/api',require('./Routes/CreateStudent'));
app.use('/api',require('./Routes/FetchStudents'));
app.use('/api',require('./Routes/AddStudentsToTeam'));
app.use('/api',require('./Routes/JudgeStudents'));
app.use('/api',require('./Routes/RemoveStudentFromTeam'));

app.listen(8000, () => {
    console.log(`Example app listening on port 8000`)
  })