# CryptoApp

Une application web interactive développée en React permettant de suivre le cours des cryptomonnaies en temps réel et d'analyser l'historique des prix.

Ce tableau de bord financier connecte l'utilisateur aux données du marché (via l'API CoinGecko) et offre une visualisation claire des tendances pour faciliter le suivi des actifs.

## Fonctionnalités principales

- **Suivi du marché :** Affichage en temps réel du top des cryptomonnaies avec leur prix en euros et la variation sur 24h en pourcentage.
- **Gestion des favoris :** Possibilité d'épingler des cryptomonnaies pour les garder à l'œil dans une section favorie.
- **Analyse graphique :** Visualisation interactive de l'historique des prix grâce à un graphique de la crypto sélectionnée, affiché dynamiquement grâce au menu de crypto.
- **Filtres temporels :** Ajustement de la période d'analyse du graphique (7 jours, 30 jours, 6 mois, 1 an).

## Architecture des composants

L'application est découpée en composants réutilisables pour maintenir un code propre et modulable :

- **`Header`** : L'en-tête de l'application gérant le titre ainsi que le bouton de connexion.
- **`CryptoList`** : S'occupe de de la façon dont on s'occupe des cryptos. Il gère l'état global (données de l'API, liste des favoris, cryptomonnaie sélectionnée) et structure l'affichage en deux colonnes (liste/graphique).
- **`CryptoCard`** : Une carte individuelle affichant les informations clés d'un actif (logo, nom, symbole, prix, variation) et un bouton d'ajout/retrait des favoris.
- **`Graphiques`** : Le module d'analyse visuelle. Il utilise la bibliothèque `Recharts` pour tracer la courbe d'évolution des prix de l'actif sélectionné en fonction de la période choisie.

## 🚀 Comment lancer le projet en local

### Prérequis

Avoir **Node.js** installé sur la machine.

### Installation et exécution

1. Clone le dépôt ou télécharge le projet.
2. Ouvre un terminal à la racine du projet.
3. Installe les dépendances requises :

    ```bash
    npm install
    ```

4. Lance le serveur de développement :

    ```bash
    npm run dev
    ```

5. Lance le serveur de développement :

    Via le ce lien : <http://localhost:5173>
