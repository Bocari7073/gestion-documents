# 📄 Gestion de Documents PDF avec Authentification et GPT

Ce projet est une application web complète de gestion de fichiers PDF avec :
- Authentification (email/mot de passe + Google)
- Téléversement et affichage de fichiers PDF
- Résumé automatique via l’API OpenAI (GPT-3.5)
- Génération de contenu PDF (facture, etc.)
- Enregistrement des données en base PostgreSQL avec Kysely
- UI moderne avec Tailwind CSS

---

## 🚀 Installation

1. **Cloner le dépôt**  
   ```bash
   git clone https://github.com/ton-utilisateur/ton-projet.git
   cd ton-projet
   ```

2. **Installer les dépendances**  
   ```bash
   npm install
   ```

3. **Créer un fichier `.env.local`** à la racine avec :
   ```env
   DATABASE_URL=postgresql://user:password@localhost:5432/nom_de_ta_db
   OPENAI_API_KEY=ta_clé_openai
   GOOGLE_CLIENT_ID=ton_id_google
   GOOGLE_CLIENT_SECRET=ton_secret_google
   NEXTAUTH_SECRET=un_secret_complexe
   NEXTAUTH_URL=http://localhost:3000
   ```

4. **Démarrer le projet**  
   ```bash
   npm run dev
   ```

---

## 🗃️ Base de données

### Tables gérées avec Kysely :
- `users` : pour les comptes utilisateurs
- `files` : pour les fichiers PDF
- `factures` : pour les factures PDF générées

### Exemple de structure SQL
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE files (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  path TEXT NOT NULL,
  uploaded_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE factures (
  id SERIAL PRIMARY KEY,
  client TEXT NOT NULL,
  amount NUMERIC NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

## 🔐 Authentification

- Email + mot de passe via NextAuth + CredentialsProvider
- Google OAuth 2.0 via GoogleProvider
- Stockage sécurisé des mots de passe (bcrypt)

---

## 🧠 Appels GPT

- Résumé automatique de PDF avec OpenAI GPT-3.5
- Génération de contenu HTML converti en PDF

---

## 📁 Fonctionnalités

- ✅ Upload de fichiers PDF
- 📝 Liste des fichiers avec options de suppression
- 🔍 Extraction et résumé de contenu
- 🧾 Formulaire de création de facture PDF
- 📦 Stockage des factures/fichiers en DB

---

## 🧪 Routes API (CRUD)

- `/api/files` `GET` : liste les fichiers
- `/api/files` `POST` : téléverse un fichier
- `/api/files/[name]` `DELETE` : supprime un fichier
- `/api/invoices` `POST` : enregistre une facture
- `/api/generate-pdf` `POST` : génère un PDF à partir de contenu
- `/api/summarize` `GET` : génère un résumé GPT

---

## 🖥️ Interface utilisateur

- Design responsive avec **Tailwind CSS**
- Feedback utilisateur clair (téléversement, suppression, erreurs)
- Sécurité : accès aux pages conditionné par authentification

---

## ✅ À faire

- [x] Authentification complète
- [x] Téléversement et suppression de fichiers
- [x] Génération de PDF
- [x] Résumé avec GPT
- [x] Connexion base PostgreSQL (Kysely)

