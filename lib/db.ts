import { Kysely, PostgresDialect } from 'kysely';
import { Pool } from 'pg';

// ✅ Définition correcte des tables

interface UserTable {

  email: string;
  password: string;
  created_at: Date;
}

interface Facture {
  id?: number;
  client: string;
  amount: number;
  description?: string;
  created_at?: Date;
}

interface File {
  id?: number;
  name: string;
  path: string;
  uploaded_at: Date;
}

// ✅ Schéma global de la base de données
interface DB {
  users: UserTable;
  factures: Facture;
  files: File;
}

// ✅ Connexion PostgreSQL
export const db = new Kysely<DB>({
  dialect: new PostgresDialect({
    pool: new Pool({
      connectionString: process.env.DATABASE_URL,
    }),
  }),
});
