//Invocamos a la conexion de la DB
const conexion = require('../database/db');
//GUARDAR un REGISTRO
exports.save = (req, res)=>{
    const nombre= req.body.nombre;
    const apellido = req.body.apellido;
    const telefono= req.body.telefono;
    const correo= req.body.correo;
    conexion.query('INSERT INTO clientes SET ?', {nombre:nombre, apellido:apellido, telefono:telefono, correo:correo}, (error, results)=>{
        if(error){
            console.log(error);
        }else{
            //console.log(results);   
            res.redirect('/principal');         
        }
});
};
//ACTUALIZAR un REGISTRO
exports.update = (req, res)=>{
    const id = req.body.idcliente;
    const nombre= req.body.nombre;
    const apellido = req.body.apellido;
    const telefono= req.body.telefono;
    const correo= req.body.correo;
    conexion.query('UPDATE clientes SET ? WHERE idcliente = ?',[{nombre:nombre, apellido:apellido, telefono:telefono, correo:correo}, id], (error, results)=>{
        if(error){
            console.log(error);
        }else{           
            res.redirect('/principal');         
        }
});
};