import { PGlite } from '@electric-sql/pglite';

const db = new PGlite('idb://my-pgdata');
export default db;
