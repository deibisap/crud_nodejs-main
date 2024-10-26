const express = require('express');
const app = express();
app.set('view engine','ejs');
app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.use('/', require('./router'));

//DIRECTORIO PUBLICO
app.use('/resource', express.static('public'));
app.use('/resource', express.static(__dirname + 'public'));


//CONFIGURACIÓN DE SERVIDOR
app.listen(3000, ()=>{
    console.log('SERVER corriendo en http://localhost:3000');
});