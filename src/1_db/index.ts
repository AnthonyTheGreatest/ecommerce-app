import pg from 'pg';
const { Pool } = pg;

const pool = new Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: parseInt(process.env.PGPORT ?? '5432') // nullish coalescing operator 
});

const query = (text: string, params: string[]) => pool.query(text, params);

export default query;
