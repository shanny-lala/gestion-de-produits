<div align="center">

<img src="assets/screenshots/miniature.png" alt="Gestion de Produits" width="200"/>

# 📦 Gestion de Produits — Application Hybride React Native

**Application mobile full-stack de gestion d'inventaire produits avec statistiques en temps réel.**

[![React Native](https://img.shields.io/badge/React_Native-0.81.5-61DAFB?style=for-the-badge&logo=react)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-54.0-000020?style=for-the-badge&logo=expo)](https://expo.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js)](https://nodejs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-4169E1?style=for-the-badge&logo=postgresql)](https://www.postgresql.org/)

</div>

---

## 🎯 À propos du projet

Ce projet répond au **Sujet 19** d'un travail pratique académique :

> *Développer une application hybride React Native / Flutter / Ionic ayant accès à une base de données distante (MySQL, PostgreSQL, etc.) permettant la gestion complète de produits.*

L'application permet de gérer un catalogue de produits avec les fonctionnalités CRUD complètes, un affichage en liste (`FlatList`), des statistiques agrégées (montant minimal, maximal, total) et une visualisation graphique via histogramme et camembert.

---

## ✨ Fonctionnalités

| Fonctionnalité | Description |
|---|---|
| ➕ **Ajouter un produit** | Formulaire avec `numProduit`, `design`, `prix`, `quantité` |
| 📋 **Afficher la liste** | FlatList scrollable avec `montant = prix × quantité` calculé automatiquement |
| ✏️ **Modifier un produit** | Édition via modal pré-rempli |
| 🗑️ **Supprimer un produit** | Suppression avec confirmation depuis la FlatList |
| 📊 **Statistiques globales** | Barre fixe affichant montant **Min** / **Max** / **Total** |
| 📈 **Graphiques** | Visualisation en **histogramme** (bar chart) et **camembert** (pie chart) |
| 🔄 **Synchronisation** | Pull-to-refresh pour recharger les données depuis le serveur |

---

## 📱 Captures d'écran

<div align="center">

| Tableau de bord | Actions (Éditer / Supprimer) |
|:---:|:---:|
| <img src="assets/screenshots/tableau de bord.jpg" width="220"/> | <img src="assets/screenshots/les actions editer et supprimer.jpg" width="220"/> |

| Formulaire d'édition | Statistiques (Histogramme) |
|:---:|:---:|
| <img src="assets/screenshots/editer un produit.jpg" width="220"/> | <img src="assets/screenshots/statistiques 1.jpg" width="220"/> |

| Statistiques (Camembert) |
|:---:|
| <img src="assets/screenshots/statistiques 2.jpg" width="220"/> |

</div>

---

## 🏗️ Architecture du projet

```
React Native (gestion de produits)/
├── 📁 mobile/                    # Application React Native (Expo)
│   ├── App.js                    # Point d'entrée, navigation principale
│   ├── app.json                  # Configuration Expo
│   ├── package.json
│   └── src/
│       ├── components/           # Composants réutilisables (cartes, modals...)
│       ├── screens/              # Écrans : Liste Produits, Statistiques
│       ├── services/             # Appels API (axios)
│       ├── theme/                # Couleurs, typographies, styles globaux
│       └── utils/                # Fonctions utilitaires (formatage...)
│
├── 📁 server/                    # API REST Node.js / Express
│   ├── server.js                 # Point d'entrée du serveur
│   ├── .env                      # Variables d'environnement (non versionné)
│   ├── .env.example              # Modèle de configuration
│   ├── config/
│   │   └── db.js                 # Connexion PostgreSQL (pool)
│   ├── controllers/
│   │   └── produitsController.js # Logique CRUD des produits
│   ├── routes/
│   │   └── produits.js           # Routes API /api/produits
│   └── sql/
│       └── init.sql              # Script d'initialisation de la base de données
│
└── 📁 assets/screenshots/        # Captures d'écran de l'application
```

---

## 🛠️ Stack technique

**Frontend (Mobile)**
- **React Native** 0.81.5 + **Expo** ~54.0
- **React Navigation** (Bottom Tabs) — Navigation entre les écrans
- **Axios** — Appels HTTP vers l'API REST
- **react-native-chart-kit** — Graphiques (histogramme, camembert)
- **react-native-reanimated** + **react-native-gesture-handler** — Animations fluides

**Backend**
- **Node.js** + **Express** 5 — Serveur REST
- **PostgreSQL** — Base de données relationnelle
- **pg** (node-postgres) — Driver PostgreSQL
- **dotenv** — Gestion des variables d'environnement
- **cors** — Gestion des origines croisées

---

## ⚙️ Prérequis

Avant de lancer le projet, assurez-vous d'avoir installé :

- [Node.js](https://nodejs.org/) v18 ou supérieur
- [PostgreSQL](https://www.postgresql.org/) 14 ou supérieur
- [Expo Go](https://expo.dev/go) sur votre téléphone (Android / iOS)
- `npm` ou `yarn`

---

## 🚀 Guide de démarrage manuel

### Étape 1 — Cloner le dépôt

```bash
git clone https://github.com/VOTRE_USERNAME/react-native-gestion-produits.git
cd "react-native-gestion-produits"
```

---

### Étape 2 — Configurer et lancer la base de données (PostgreSQL)

**2.1. Créer la base de données**

Connectez-vous à PostgreSQL :
```bash
sudo -u postgres psql
```

Dans le shell PostgreSQL, exécutez :
```sql
CREATE DATABASE produits_db;
\q
```

**2.2. Initialiser les tables**

```bash
psql -U postgres -d produits_db -f server/sql/init.sql
```

Cette commande crée la table `produits`, un trigger de mise à jour automatique de `updated_at`, et insère des données de test.

---

### Étape 3 — Configurer et lancer le serveur (Backend)

**3.1. Installer les dépendances**

```bash
cd server
npm install
```

**3.2. Configurer les variables d'environnement**

Copiez le fichier modèle et remplissez vos informations :
```bash
cp .env.example .env
```

Éditez `.env` avec vos identifiants PostgreSQL :
```env
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=VOTRE_MOT_DE_PASSE
DB_NAME=produits_db
```

**3.3. Démarrer le serveur**

```bash
node server.js
```

✅ Si tout est correct, vous verrez :
```
Server is running on port 3000
Connected to Database at: 2026-...
```

> 💡 **Astuce** : Pour redémarrer automatiquement lors des modifications, installez nodemon :
> ```bash
> npm install -g nodemon
> nodemon server.js
> ```

---

### Étape 4 — Configurer et lancer l'application mobile (Frontend)

**4.1. Installer les dépendances**

Ouvrez un **nouveau terminal** :
```bash
cd mobile
npm install
```

**4.2. Configurer l'URL de l'API**

Dans `src/services/` (ou le fichier de configuration API), remplacez `localhost` par **l'adresse IP locale de votre machine** :

```javascript
// Exemple : si votre IP locale est 192.168.1.10
const API_BASE_URL = 'http://192.168.1.10:3000/api';
```

> ⚠️ **Important** : Sur mobile physique, `localhost` ne fonctionne pas. Utilisez `ipconfig` (Windows) ou `ip addr` (Linux/Mac) pour trouver votre IP locale.

**4.3. Démarrer l'application**

```bash
npm start
```
Ou directement :
```bash
npx expo start
```

**4.4. Ouvrir l'application**

Un QR code s'affiche dans le terminal :

| Méthode | Action |
|---|---|
| 📱 **Téléphone physique** | Scannez le QR code avec **Expo Go** |
| 🤖 **Émulateur Android** | Appuyez sur **`a`** dans le terminal |
| 🍎 **Simulateur iOS** | Appuyez sur **`i`** dans le terminal |
| 🌐 **Navigateur Web** | Appuyez sur **`w`** dans le terminal |

---

## 📡 Endpoints de l'API REST

| Méthode | Endpoint | Description |
|---|---|---|
| `GET` | `/api/produits` | Récupérer tous les produits |
| `GET` | `/api/produits/:id` | Récupérer un produit par ID |
| `POST` | `/api/produits` | Créer un nouveau produit |
| `PUT` | `/api/produits/:id` | Modifier un produit existant |
| `DELETE` | `/api/produits/:id` | Supprimer un produit |

**Exemple de corps de requête (POST / PUT) :**
```json
{
  "num_produit": "P-0042",
  "design": "Clavier Mécanique RGB",
  "prix": 89.99,
  "quantite": 50
}
```

---

## 🗄️ Schéma de la base de données

```sql
CREATE TABLE produits (
    id          SERIAL PRIMARY KEY,
    num_produit VARCHAR(20)     UNIQUE NOT NULL,
    design      VARCHAR(100)    NOT NULL,
    prix        DECIMAL(10, 2)  NOT NULL CHECK (prix >= 0),
    quantite    INTEGER         NOT NULL CHECK (quantite >= 0),
    created_at  TIMESTAMP       DEFAULT CURRENT_TIMESTAMP,
    updated_at  TIMESTAMP       DEFAULT CURRENT_TIMESTAMP
);
```

> Le champ `montant` (`prix × quantité`) est **calculé côté client** et n'est pas stocké en base de données.

---

## 🔐 Sécurité

- Le fichier `.env` est **exclu du dépôt** via `.gitignore` — ne jamais le committer.
- Utilisez `.env.example` comme modèle pour partager la structure de configuration.
- Les entrées utilisateur sont validées côté serveur avec **express-validator**.

---

## 📄 Licence

Ce projet est développé dans le cadre d'un travail académique à l'**ENI** (École Nationale d'Informatique).

---

<div align="center">
Développé avec ❤️ en React Native + Node.js
</div>
