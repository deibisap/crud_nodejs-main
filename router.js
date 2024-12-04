const express = require('express');
const router = express.Router();

const bcryptjs = require('bcryptjs');

const conexion = require('./database/db');

router.get('/', (req, res)=>{                      
    res.render('login.ejs');            
})


router.get ('/login',(req,res)=> {
    res.render('login');
})
 
router.get ('/register',(req,res)=> {
    res.render('register');
})

router.post('/register', async (req, res) => {
    const user= req.body.user;
    const name= req.body.name;
    const rol = req.body.rol;
    const pass = req.body.pass;
    let passwordHaash = await bcryptjs.hash(pass, 8);
    conexion.query('INSERt INTO users SET ?' ,{user:user, name:name, rol:rol, pass:passwordHaash}, async (error, results)=>{

            if(error){
                console.log(error);
            }else{
                res.render('register', {
                    alert:true,
                    alertTitle: "Registro",
                    alertMessage: "!Te haz registrado correctamente!",
                    alertIcon: 'success',
                    showConfirmButton:false,
                    timer: 1500,
                    ruta:" "
                })
                 
            }
    })
       
});


router.get('/principal',(req,res)=> {
    conexion.query ('SELECT * FROM clientes ', async(error, results2) =>{
        res.render('index.ejs', {results:results2});  
    }) 
})

router.post('/auth', async(req, res) => {
    const user = req.body.user;
    const pass = req.body.pass;
    let passwordHaash = await bcryptjs.hash(pass,8);
    if(user && pass){

        conexion.query ('SELECT * FROM users WHERE user = ?', [user], async(error, results) =>{
            if(results.length == 0 || ! (await bcryptjs.compare (pass, results[0].pass))){
                res.render('login.ejs') 
            }else {

                conexion.query ('SELECT * FROM clientes ', async(error, results2) =>{
                    res.render('index.ejs', {results:results2});  
                }) 
				    	
                
            }

        } )

    } else {	
		res.send('Please enter user and Password!');
		res.end();
	}
   
});

router.get('/create', (req,res)=>{
    res.render('create');
})

router.get('/edit/:id', (req,res)=>{    
    const id = req.params.id;
    conexion.query('SELECT * FROM clientes WHERE idcliente=?',[id] , (error, results) => {
        if (error) {
            throw error;
        }else{            
            res.render('edit.ejs', {user:results[0]});            
        }        
    });
});

router.get('/delete/:id', (req, res) => {
    const id = req.params.id;
    conexion.query('DELETE FROM clientes WHERE idcliente = ?',[id], (error, results)=>{
        if(error){
            console.log(error);
        }else{           
            conexion.query ('SELECT * FROM clientes ', async(error, results2) =>{
                res.render('index.ejs', {results:results2});  
            })        
        }
    })
});

const crud = require('./controllers/crud');

router.post('/save', crud.save);
router.post('/update', crud.update);

module.exports = router;