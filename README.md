# Survival Parc - Frontend

## 🚀 Présentation du projet

**Survival Parc** vous plonge dans une expérience immersive au sein d'un univers post-apocalyptique ravagé par un virus zombie. Inspiré de sagas comme *The Last of Us*, le parc recrée une zone de quarantaine réaliste où chaque détail transporte les visiteurs dans un monde hostile et captivant.

Le parc est réservé aux visiteurs de plus de 16 ans pour préserver l'intensité de l'expérience. Les billets sont disponibles à la journée, avec la possibilité de réserver un séjour dans l'un des deux hôtels au décor apocalyptique.

L'objectif du site est de permettre aux visiteurs :
- Créer un compte utilisateur
- Gérer leur profil
- Réserver leurs billets et hébergements
- Consulter les informations du parc, attractions et hôtels

Le back-office permet au gérant de :
- Gérer les attractions, événements et hôtels
- Consulter les réservations
- Modifier les informations du site

---

## 🎯 Fonctionnalités du frontend

### 🔥 Pour les utilisateurs
- **Accueil immersif et responsive** sur le thème du parc
- **Création de compte et connexion utilisateur** (avec formulaire validé)
- **Gestion du profil** (adresse, historique des réservations)
- **Réservation simplifiée** (choix du pass et de l'hôtel)
- **Affichage des attractions et hôtels** (images, descriptions)
- **Redirection automatique vers la page de profil après connexion**
- **Interface fluide et animée** (Framer Motion)

### 🔧 Pour les administrateurs
- **Connexion admin dédiée**
- **Interface de gestion du contenu** (attractions, événements, hôtels)
- **Accès à la liste des réservations**

### 📌 Évolutions possibles
- **Mode sombre** pour une immersion renforcée
- **Système de notifications en direct** (par exemple, alerte d'infection imminente 🎯)

---

## 🛠️ Technologies utilisées

### 🌟 Front-end
- Vite 
- React
- TypeScript
- Tailwind CSS
- Framer Motion
- DaisyUI
- Axios
- React Router
- React Hook Form

### 🔥 Back-end
- Node.js
- Express
- Sequelize
- PostgreSQL
- Joi (validation des données)
- JWT (authentification)
- Bcrypt (hachage des mots de passe)
- dotenv (gestion des variables d'environnement)

### 🔒 Sécurité
- Validation des champs (Joi)
- JWT Token
- Cookies sécurisés (anti-XSS/CSRF)
- Hachage des mots de passe (bcrypt)

---

## ⚙️ Installation du projet

### 🚀 Backend

1. **Cloner le projet** :
   ```bash
   git clone https://github.com/votre-repo/survival-parc-back.git
   cd survival-parc-back
   ```

2. **Installer les dépendances** :
   ```bash
   pnpm install
   ```

3. **Configurer les variables d'environnement** :
   Créez un fichier `.env` à la racine avec :
   ```env
   DB_HOST=localhost
   DB_USER=postgres
   DB_PASSWORD=votre_mot_de_passe
   DB_NAME=survival_parc
   JWT_SECRET=unSecretTresSecret
   PORT=3001
   ```

4. **Lancer le serveur en développement** :
   ```bash
   pnpm dev
   ```

5. **Reset et seed de la base de données (si nécessaire)** :
   ```bash
   pnpm db:reset
   pnpm db:seed
   ```

### 💻 Frontend

1. **Cloner le projet front** :
   ```bash
   git clone https://github.com/votre-repo/survival-parc-front.git
   cd survival-parc-front
   ```

2. **Installer les dépendances** :
   ```bash
   pnpm install
   ```

3. **Lancer le serveur de développement** :
   ```bash
   pnpm dev
   ```

4. **Accéder au site** :
   Le site tourne sur `http://localhost:5173`

---

## 🧠 Test du backend

### 🔬 Lancer les tests

```bash
pnpm test
```

---

## 📌 Routes principales

(les routes backend restent inchangées)

---

## 🎟️ Dossier de présentation complet en PDF dans le back

Un dossier complet regroupant tous les éléments essentiels du projet est disponible en PDF dans le backend. Il inclut :
- Les wireframes détaillés des pages principales
- Les user stories décrivant les parcours utilisateurs
- Les schémas de la base de données
- Les spécifications techniques
- Une maquette visuelle du site

---

## 🔍 Veille technologique

- Suivi des mises à jour de sécurité (Node.js, Sequelize, PostgreSQL)
- Surveillance des failles XSS/CSRF
- Mise à jour des bonnes pratiques en gestion d'authentification

---

## Projet réalisé par **Aline** en autonomie pour le passage devant le jury au TP DWWM

✨ **Survival Parc - Parce que survivre, c'est déjà une aventure !**

