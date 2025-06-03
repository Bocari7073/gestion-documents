// lib/types.ts
import { Generated } from 'kysely';
export interface UserTable {
  id: string;
  name: string;
  email: string;
  password: string;
  created_at: Date;
}

export interface Database {
  users: UserTable;
}

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  created_at: Date;
}

export interface DB {
  users: User;
}

export interface FactureTable {
  id: Generated<number>;
  client_name: string;
  date: string;
  amount: number;
  created_at: Generated<string>;
}

