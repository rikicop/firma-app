const express = require("express")
const app = express()

const cors = require("cors")

const port = 5002;

const Pool = require('pg').Pool;
const { Client } = require('pg');

const { exec } = require('child_process');

const fs = require('fs');

// Ruta del archivo en el contenedor de Docker
const dockerFilePath = '/tmp/firmas.csv';

// Ruta del directorio de destino en tu sistema operativo local
const localDirPath = 'C:/Users/Ricardo/Portfolio/firma-app/server';

// Comando de docker cp
const dockerCpCmd = `docker cp server-mi-postgres-1:${dockerFilePath} ${localDirPath}`;


const iphost = '192.168.1.12' // PRADOS

//const iphost = '192.168.20.23' // CASA

const pool = new Pool({
    user: 'ricardo',
    host:  iphost, 
    database: 'campaign',
    password: '1234',
    port: 5432,
});


//middleware
app.use(cors())
// Agregar el middleware express.json() para procesar datos JSON en las solicitudes entrantes
app.use(express.json());

// Check connection to database
const client = new Client({
    user: 'ricardo',
    host: iphost,
    database: 'campaign',
    password: '1234',
    port: 5432,
});

/* Download CSV */

app.get('/api/download', (req, res) => {
  const filePath = './firmas.csv';

  const fileStream = fs.createReadStream(filePath);
  res.setHeader('Content-disposition', 'attachment; filename=archivo.csv');
  res.setHeader('Content-type', 'text/csv');

  fileStream.pipe(res);
});



/* Get all todos from table */


app.get('/api/todos', async (req, res) => {
    try {
        const allTodos = await pool.query('SELECT * FROM firmas');
        res.json(allTodos.rows);
    } catch (err) {
        console.error(err.message);
    }
});

/* Post just one automatically
 
app.get('/api/one', async (req, res) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    await client.query('INSERT INTO firmas (enlace, cc, name, valid_signature, verified_signature, problem_type, origin_type) VALUES ($1, $2, $3, $4, $5, $6, $7)', ['http://example.com', 1234567890, 'John Doe', 'yes', 'yes', 'problem', 'origin']);
    await client.query('COMMIT');
    console.log('Record inserted successfully');
    res.sendStatus(200);
  } catch (e) {
    await client.query('ROLLBACK');
    throw e;
  } finally {
    client.release();
  }
});
*/

/* Post one Firma  */

app.post('/api/one', async (req, res) => {
  try {
    const { enlace, cc, name, valid_signature, verified_signature, problem_type, origin_type } = req.body;
    const newTodo = await pool.query(
      'INSERT INTO firmas (enlace, cc, name, valid_signature, verified_signature, problem_type, origin_type) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [enlace, cc, name, valid_signature, verified_signature, problem_type, origin_type]
    );
   pool.query('COPY firmas TO \'/tmp/firmas.csv\' DELIMITER \',\' CSV HEADER;', (err, res) => {
     if (err) {
       console.log(err.stack);
     } else {
       console.log('Copia de seguridad de firmas en CSV creada exitosamente');
      }
     pool.end();
   });
   exec(dockerCpCmd, (err, stdout, stderr) => {
  	if (err) {
    		console.error(`Error al copiar el archivo desde el contenedor de Docker: ${err}`);
    	return;
  }

   console.log('Archivo copiado exitosamente desde el contenedor de Docker.');
  });

    res.json(newTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
});


client.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err.stack);
    } else {
        console.log('Connected to the database!');
    }
});

//wif 13475321

app.listen(port,()=>{
 console.log(`Servidor corriendo en puerto ${port}`)
})
