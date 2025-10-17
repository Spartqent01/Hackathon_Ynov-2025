# Hackathon - Ynov Toulouse 2025 : Babyfoot du futur - FullStack

## Equipe

- Dev' FullStack 1 : BOUCAUD Dorian
- Dev' FullStack 2 : HEUILLET Aubin
- Dev' FullStack 3 : HEUILLET Médéric

Et si on réinventait l’expérience babyfoot à Ynov ? L’objectif de ce hackathon est de moderniser et digitaliser l’usage des babyfoots présents dans le Souk pour créer un service _next-gen_, pensé pour près de 1000 étudiants !

Que ce soit via des gadgets connectés, un système de réservation intelligent, des statistiques en temps réel ou des fonctionnalités robustes pour une utilisation massive, nous cherchons des solutions innovantes qui allient créativité et technologie.

Toutes les filières sont invitées à contribuer : Dev, Data, Infra, IoT, Systèmes embarqués… chaque idée compte pour rendre le babyfoot plus fun, plus pratique et plus connecté.

Votre mission : transformer le babyfoot classique en expérience high-tech pour Ynov !

---

> Ce fichier contient les informations spécifiques au développement FullStack de votre projet. Il suffit d'en remplir une seule fois, même si vous êtes plusieurs développeurs FullStack dans l'équipe.

# Requis

Ce README contient les requis fonctionnels de la partie FullStack de votre projet. Il doit compléter le README principal à la racine du projet, et servira la partie de votre note propre à votre spécialité.

Basez-vous sur les spécifications dans [SPECIFICATIONS.md](../SPECIFICATIONS.md) pour remplir ce document.

Décrivez ici les fonctionnalités que vous avez implémentées, votre démarche, les choix techniques que vous avez faits, les difficultés rencontrées, etc. Précisez également dans quelle mesure vous avez pu collaborer avec les autres spécialités.

Autrement, il n'y a pas de format imposé, mais essayez de rester clair et concis, je ne vous demande pas de rédiger un roman, passez à l'essentiel, et épargnez-moi de longues pages générées par IA (malusée).

En conclusion, cela doit résumer votre travail en tant que développeur.se FullStack, et vous permettre de garder un trace écrite de votre contribution au projet.

Merci de votre participation, et bon courage pour la suite du hackathon !

# Suuuper Tournoi


Ce projet est une application web full-stack développée avec **Next.js**. Le front-end est construit avec **Shadcn/ui** et **Tailwind CSS** pour une interface utilisateur moderne et accessible. La partie serveur et la communication avec la base de données sont gérées par l'ORM **Prisma**.

---

## 🛠️ Stack Technique

* **Framework :** [Next.js](https://nextjs.org/)
* **Bibliothèque UI :** [React](https://reactjs.org/)
* **Composants UI :** [Shadcn/ui](https://ui.shadcn.com/)
* **Styling :** [Tailwind CSS](https://tailwindcss.com/)
* **ORM / Base de données :** [Prisma](https://www.prisma.io/)

---

## 🚀 Mise en Route

Suivez ces étapes pour installer et lancer le projet en local.

### **1. Prérequis**

Assurez-vous d'avoir **Node.js** (version 18 ou plus) installé sur votre machine. Vous aurez également besoin d'une base de données compatible avec Prisma.

### **2. Installation**

1.  **Clonez ce dépôt :**
    ```bash
    git clone git@github.com:Spartqent01/Hackathon_Ynov-2025.git
    ```

2.  **Naviguez vers le répertoire du projet :**
    ```bash
    cd hackathon-app
    ```

3.  **Installez les dépendances du projet :**
    ```bash
    npm install
    ```

4.  **Configurez votre base de données :**
    * Copiez le fichier d'exemple `.env.example` et renommez-le en `.env`.
    * Modifiez la variable `DATABASE_URL` dans le fichier `.env` pour y mettre l'URL de connexion à votre base de données.

5.  **Synchronisez votre base de données avec le schéma Prisma :**
    ```bash
    npx prisma db push
    ```

---

## 🖥️ Lancer l'application

### **Mode Développement**

Pour lancer le serveur de développement avec rechargement à chaud :

```bash
npm run dev
```

**L'application sera accessible à l'adresse http://localhost:3000.**

Mode Production
Pour construire l'application et la démarrer en mode production :

Construisez le projet :
``` bash
npm run build
```
**Démarrez le serveur de production :**
``` bash
npm run start
```

