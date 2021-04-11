const path = require('path');

const express = require('express');
const dotEnv = require('dotenv');
const bodyPaser = require('body-parser');

const connectDB = require('./config/database');
const baseinfo_I = require('./controller/baseinfo_I');
const baseinfo_II = require('./controller/baseinfo_II');
const baseinfo_III = require('./controller/baseinfo_III');



//* load config
dotEnv.config({path : "./config/config.env"});

//* Database connection
connectDB();

//--------------------
const app = express();
//--------------------

//* bodyPaser
app.use(bodyPaser.urlencoded({ extended: false }));

//* static folder
app.use(express.static(path.join(__dirname, "public")));

//* viewEngine
app.set("view engine", "ejs");
app.set("views", "views");


//*------routes------

//? base info 

app.get("/" , baseinfo_I.getfulldata );

app.post("/addNew/" , baseinfo_I.setitem );

app.get( "/delete/:id/" , baseinfo_I.deleteitem );

app.post( "/edit/:id/" , baseinfo_I.edititem );

app.post("/search/" , baseinfo_I.searchitem );

//? base info II

app.get("/geteach/:id/" , baseinfo_II.getfulldata );


//? base info III

app.get("/charity_account" , baseinfo_III.getfulldata );

app.post("/charity_account/addNew/" , baseinfo_III.setitem );

app.get("/charity_account/delete/:id/" , baseinfo_III.deleteitem );

app.post("/charity_account/edit/:id/" , baseinfo_III.edititem );



const PORT = process.env.PORT || 3000;


app.listen(PORT , () => console.log(`server is running in ${process.env.NODE_ENV} mode on port ${PORT}`));