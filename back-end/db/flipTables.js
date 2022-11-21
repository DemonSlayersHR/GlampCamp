const pool = require('./db.js')

const flipTables = async () => {
  const commands = await pool.query(`
  SELECT 'drop table if exists "' || tablename || '" cascade;'
  FROM pg_tables
  WHERE schemaname = 'public';`)
  console.log(commands.rows)
  for (let i of commands.rows) {
    pool.query(i['?column?'])
  }
}

flipTables()

// run the command below to (╯°□°)╯︵ ┻━┻ (might need to run a few times...not sure why)
// node back-end/db/flipTables.js