export interface DB {
  users: {
    id: string;
    email: string;
    password: string; 
    name: string | null;
    image: string | null;
    email_verified: Date | null;
  };
  files: { // ✅ attention au nom pluriel (plus conventionnel)
    id: string;
    user_id: string;
    name: string;
    url: string;
  };
  
  // ... autres tables (sessions, accounts, etc.)
}
