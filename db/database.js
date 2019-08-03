const { Pool } = require('pg');
const uri = 'postgres://vbiwopnu:CFbY1i-zkHiBzL0huRQtxUuN6EbR-ZGE@raja.db.elephantsql.com:5432/vbiwopnu';

const pool = new Pool({
  connectionString: uri,
})

// pool.query('SELECT lastname FROM thirty',(err, result)=>{
//   if(err){
//     return console.log(err);
//   }
//   console.log(result);
// })

module.exports = pool;
