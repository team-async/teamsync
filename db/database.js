const { Pool } = require('pg');
const uri = 'postgres://vbiwopnu:CFbY1i-zkHiBzL0huRQtxUuN6EbR-ZGE@raja.db.elephantsql.com:5432/vbiwopnu';

//creating a connection to our postgres database,
// that can be exported anywhere in our project
const pool = new Pool({
  connectionString: uri,
})

module.exports = pool;
