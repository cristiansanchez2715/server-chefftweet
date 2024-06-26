const express = require("express")
const app = express()
const cors = require("cors")
const mysql = require("mysql2")
// ejecutando metodos para el funcionamiento correcto
app.use(express.json());
app.use(cors({ origin: '*' }))
// const bcrypt = require('bcrypt')
saltRounds = 10


//enlace base de datos: https://console.clever-cloud.com/organisations/orga_11d59417-a061-4655-86c6-1493d43f1b31/addons/addon_eb73ce18-362a-4939-9531-8ababa532211

const port = 4000

const users = [
    {user: "cristian2715", nombre: "cristian", apellido: "medina", contraseña: "123", email: "cristiansanchez2715@gmail.com", gender: ""},
    
    {user: "cristian2715", nombre: "cristian", apellido: "medina", contraseña: "123", email: "cristiansanchez2715@gmail.com", gender: ""},
    
    {user: "cristian2715", nombre: "cristian", apellido: "medina", contraseña: "123", email: "cristiansanchez2715@gmail.com", gender: ""}
]


app.get("/", (req, res) => {
    res.send("servidor montado pape")
})

// app.get("/users", (req, res) => {
//     res.send(users)
// })

app.listen(port, () => {
    console.log("servidor montado")
})


// recibiendo nuevos usuarios 
app.post("/create-user", (req, res) => {
    const newUser = req.body;
  console.log(newUser)
    
    
  
    res.status(200).json({ message: "Datos de usuario recibidos exitosamente" });
  });

// conexion que enviara usuarios a la base de datos

const connection = mysql.createConnection({
  // host: "127.0.0.1",  // Usa el nombre de host proporcionado
 host: "bbvn0lj6xje1xr4hki5s-mysql.services.clever-cloud.com", 
  // user: "root",
  user: "umnyffegegdfrmeh",
  // password: "spizamarillo2715",
  password: "vwjxG0hZ4lvoyTvuocUf",
  // database: "cheff_tweet",
  database: "bbvn0lj6xje1xr4hki5s",
  port: 3306,  // Utiliza el puerto proporcionado
});

connection.connect((err) => {
  if (err) {
    console.error("Error de conexión a la base de datos:", err);
  } else {
    console.log("Conexión a la base de datos establecida");
  }
});

app.use(express.json());
// Ruta para recibir nuevos usuarios
app.post("/store-user", (req, res) => {
const newUser = req.body;

// Insertar el nuevo usuario en la base de datos
connection.query("INSERT INTO usuarios SET ?", newUser, (error, results, fields) => {
  console.log("Dentro de la función de callback de connection.query");
  console.log("Error:", error);
  console.log("Results:", results);
  console.log("Fields:", fields);
  if (error) {
    console.error("Error al insertar el nuevo usuario:", error);
    res.status(500).json({ message: "Error al insertar el nuevo usuario en la base de datos" });
  } else {
    console.log("Nuevo usuario insertado con éxito");
    res.status(200).json({ message: "Datos de usuario recibidos y guardados exitosamente" });
  }
});
});



// traer base de datos hasta el backend

app.get("/get_users", (req, res) => {
    connection.query("SELECT * FROM usuarios;", (error, results, fields) => {
        if(error){
            console.error("error is " + error)
            res.status(500).json({ message: "Error al obtener los usuarios de la base de datos" });
       
        }else {
            console.log("usuarios obtenidos con exito")
            res.status(200).json({ users: results });
        }
    })
})


// comprobacion presencia usuario base de datos


app.post("/login", (req, res) => {
    
    const { username, contraseña, email } = req.body;
  
    const userExists = users.some(user => user.user === username && user.contraseña === contraseña && user.email === email);
  


    if (userExists) {
   
      res.status(200).json({ message: "Inicio de sesión exitoso" });
    } else {

        res.status(401).json({ message: "Credenciales incorrectas" });
    }
  });
  




  // SERVICIO DE RECETAS 

  app.post("/store-recets", (req, res) => {
    const newRecet = req.body;
    let ip = req.ip
console.log("la ip del usuario que registro la receta es" + ip)
    // Insertar la nueva receta en la base de datos
    connection.query("INSERT INTO recetas SET ?", newRecet, (error, results, fields) => {
      console.log("Dentro de la función de callback de connection.query");
      console.log("Error:", error);
      console.log("Results:", results);
      console.log("Fields:", fields);
      if (error) {
        console.error("Error al insertar el nueva receta:", error);
        res.status(500).json({ message: "Error al insertar el nuevo usuario en la base de datos" });
      } else {
        console.log("Nuevo usuario insertado con éxito");
        res.status(200).json({ message: "Datos de receta recibidos y guardados exitosamente" });
      }
    });
  });
  

  // Traer recetas desde la base de datos

  app.get("/get_recets", (req, res) => {
    connection.query("SELECT * FROM recetas;", (error, results, fields) => {
        if(error){
            console.error("error is " + error)
            res.status(500).json({ message: "Error al obtener los usuarios de la base de datos" });
       
        }else {
            console.log("usuarios obtenidos con exito")
            res.status(200).json({ recets: results });
        }
    })
})






