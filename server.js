const express =  require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const indexRouter = require('./routes/index');

const PORT = 4000;

mongoose.connect('mongodb://localhost:27017/todos', {useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("MongoDB database connects successfully");
});


app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', indexRouter);



app.listen(PORT, () => {
    console.log("Server is running on PORT : "+PORT);
})