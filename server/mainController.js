const pool = require('../db/database.js');

const middlewareFuncs = {};

middlewareFuncs.addUser = (req, res, next) => {
    // values to be inserted into new, come from request body
    let values = [req.body.firstname, req.body.lastname, req.body.email];
    console.log(values);
    // need to fix this query to check for duplicates
    //if not exists (select * from Delegates d where d.FromYr = @FromYr and d.MemNo = @MemNo)
    //INSERT INTO Delegates ([MemNo],[FromYr],[ToYr]) values(@MemNo, @FromYr,@ToYr)
    pool.query(`INSERT INTO thirty (firstname, lastname, email) VALUES ($1, $2, $3);`,
      values, (err, results) => {
        if(err) console.log('Need to take care of possible duplicate entries');
        next();
    })
}

middlewareFuncs.poolQuery = (req, res, next) => {
    pool.query('select * from thirty', (err, result) => {
      if(err) console.log('this is an error');
      // store all rows in our table to res.locals
      res.locals.queryResult = result.rows;
      next();
    })
}

module.exports = middlewareFuncs;
