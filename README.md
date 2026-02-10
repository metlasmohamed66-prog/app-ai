# Site Saint-Valentin pour Kenza

Un site web interactif et romantique dedie a Kenza pour la Saint-Valentin. Le site offre une experience immersive avec des animations avancees, des particules, de la musique generee et un design soigne.

---

## Table des Matieres

1. [Apercu du Projet](#apercu-du-projet)
2. [Architecture et Plan](#architecture-et-plan)
3. [Fonctionnalites](#fonctionnalites)
4. [Structure des Fichiers](#structure-des-fichiers)
5. [Sections du Site](#sections-du-site)
6. [Technologies Utilisees](#technologies-utilisees)
7. [Installation et Utilisation](#installation-et-utilisation)
8. [Personnalisation](#personnalisation)
9. [Compatibilite](#compatibilite)
10. [Accessibilite](#accessibilite)

---

## Apercu du Projet

Ce site est une declaration d'amour numerique composee de 7 sections distinctes, chacune apportant une dimension emotionnelle unique. Il fonctionne sans aucune dependance externe (pas de framework, pas de librairie) - uniquement du HTML, CSS et JavaScript vanilla.

### Objectif
Creer une experience web memorable et touchante pour Kenza a l'occasion de la Saint-Valentin, combinant poesie, design visuel et interactivite.

---

## Architecture et Plan

### Plan de Conception

```
[Ecran Enveloppe] --> clic --> [Hero Animated]
                                     |
                                     v (scroll)
                               [Poeme Anime]
                                     |
                                     v
                            [Grille Qualites]
                                     |
                                     v
                         [Carousel des Raisons]
                                     |
                                     v
                           [Lettre d'Amour]
                                     |
                                     v
                         [Compteur a Rebours]
                                     |
                                     v
                           [Message Final]
```

### Decisions Techniques

| Decision | Justification |
|----------|--------------|
| Zero dependances | Performance maximale, pas de CDN a charger |
| CSS animations | Plus performantes que JS pour les transitions visuelles |
| Canvas pour les coeurs | Rendu GPU-accelere pour des dizaines de particules |
| Web Audio API | Musique generee sans fichier audio externe |
| Intersection Observer | Detection du scroll performante et native |
| CSS Custom Properties | Theme centralisee, facile a modifier |

---

## Fonctionnalites

### Visuelles
- **Enveloppe animee** : ecran d'ouverture interactif avec animation de rabat
- **Curseur coeur** : le curseur souris est remplace par un coeur anime
- **Coeurs flottants** : particules de coeurs via Canvas 2D (GPU-accelere)
- **Petales de roses** : petales CSS animes tombant en continu
- **Effet shimmer** : texte dore avec animation de brillance
- **Parallax** : effet de profondeur sur la section hero
- **Scroll Reveal** : elements apparaissant au fur et a mesure du defilement
- **Anneaux pulsants** : animation cardiaque sur le coeur final
- **Particules au survol** : mini-coeurs explosant au survol des cartes
- **Trail de coeurs** : coeurs s'envolant a chaque clic

### Interactives
- **Carousel automatique** : defilement des raisons d'amour avec controles
- **Compteur a rebours** : decompte en temps reel vers la Saint-Valentin
- **Navigation laterale** : points de navigation fixes avec detection de section
- **Bouton musique** : melodie romantique generee via Web Audio API
- **Bouton restart** : possibilite de revivre toute l'experience

### Techniques
- **Responsive** : adapte a tous les ecrans (mobile, tablette, desktop)
- **Reduced Motion** : respecte les preferences d'accessibilite
- **Performance** : requestAnimationFrame, GPU layers, Intersection Observer

---

## Structure des Fichiers

```
app-ai/
|-- index.html          # Structure HTML principale (7 sections)
|-- styles.css          # Styles complets (~800 lignes)
|   |-- Variables CSS et Reset
|   |-- Curseur personnalise
|   |-- Canvas et Particules
|   |-- Ecran Enveloppe
|   |-- Section Hero
|   |-- Section Poeme
|   |-- Section Qualites
|   |-- Section Carousel/Raisons
|   |-- Section Lettre d'Amour
|   |-- Section Compteur
|   |-- Section Finale
|   |-- Navigation Laterale
|   |-- Bouton Musique
|   |-- Responsive (768px, 480px)
|   `-- Accessibilite (prefers-reduced-motion)
|-- script.js           # JavaScript interactif (~400 lignes)
|   |-- Curseur personnalise + trail
|   |-- Canvas coeurs flottants
|   |-- Petales de roses
|   |-- Ecran enveloppe
|   |-- Scroll Reveal (Intersection Observer)
|   |-- Animation poeme
|   |-- Carousel raisons
|   |-- Compteur a rebours
|   |-- Navigation laterale
|   |-- Musique (Web Audio API)
|   |-- Bouton restart
|   |-- Particules au survol
|   `-- Parallax hero
`-- README.md           # Cette documentation
```

---

## Sections du Site

### 1. Ecran Enveloppe (Splash Screen)
- Fond sombre elegant avec enveloppe 3D au centre
- Animation du rabat au survol
- Badge "K" au centre de l'enveloppe
- Etincelles (sparkles) animees autour
- Clic pour reveler le site

### 2. Hero (Accueil)
- Animation d'apparition sequentielle (titre, sous-titre, date)
- Coeur pulsant avec effet heartbeat
- Nom "Kenza" en or avec effet shimmer
- Indicateur de scroll anime
- Effet parallax au defilement

### 3. Poeme
- Carte blanche avec bordure decorative
- Vers apparaissant un par un avec delais
- Police serif italique pour l'elegance
- Signature en script dore

### 4. Qualites (Ce Que J'Adore Chez Toi)
- Grille de 6 cartes avec icones
- Animation au scroll + hover lift
- Barre de progression coloree au survol
- Mini-coeurs explosant au survol

### 5. Raisons (Carousel)
- 5 raisons d'amour en carousel
- Transition slide avec exit/enter
- Auto-defilement toutes les 5 secondes
- Controles (fleches + dots)
- Fond sombre avec accents dores

### 6. Lettre d'Amour
- Effet papier ancien avec lignes
- Marge rouge a gauche (style cahier)
- Timbre coeur en haut a droite
- Typographie manuscrite pour la signature
- Animation reveal au scroll

### 7. Compteur a Rebours
- Decompte en temps reel vers le 14 fevrier
- Separateurs clignotants
- Symbole infini pulse
- Gestion automatique de l'annee

### 8. Message Final
- Anneaux pulsants concentriques
- Texte "Je t'aime Kenza" mot par mot
- "Kenza" en or avec effet special
- Bouton pour recommencer l'experience

---

## Technologies Utilisees

| Technologie | Usage |
|-------------|-------|
| **HTML5** | Structure semantique du site |
| **CSS3** | Animations, Grid, Flexbox, Custom Properties, clip-path |
| **JavaScript ES6+** | Logique interactive, Canvas API, Web Audio API |
| **Google Fonts** | Dancing Script, Playfair Display, Lora |
| **Canvas 2D** | Rendu des coeurs flottants |
| **Web Audio API** | Generation de melodie sans fichier audio |
| **Intersection Observer** | Detection performante du scroll |

---

## Installation et Utilisation

### Methode 1 : Ouverture directe
```bash
# Cloner le depot
git clone <url-du-depot>
cd app-ai

# Ouvrir dans le navigateur
open index.html
# ou
xdg-open index.html  # Linux
```

### Methode 2 : Serveur local
```bash
# Avec Python
python3 -m http.server 8080

# Avec Node.js (si npx disponible)
npx serve .

# Puis ouvrir http://localhost:8080
```

### Navigation
1. **Cliquer sur l'enveloppe** pour ouvrir le site
2. **Defiler** pour decouvrir chaque section
3. **Utiliser les points** a droite pour naviguer rapidement
4. **Activer la musique** avec le bouton en bas a droite
5. **Cliquer sur "Revivre l'experience"** pour recommencer

---

## Personnalisation

### Changer les couleurs
Modifier les variables CSS dans `:root` de `styles.css` :
```css
:root {
    --primary: #e74c6f;        /* Rose principal */
    --primary-dark: #c0392b;   /* Rose fonce */
    --primary-light: #ff6b8a;  /* Rose clair */
    --secondary: #f8b4c8;      /* Rose pastel */
    --gold: #d4a574;           /* Or */
    --gold-light: #f0d5a8;     /* Or clair */
    --cream: #fdf6f0;          /* Fond creme */
}
```

### Changer le prenom
Rechercher et remplacer "Kenza" dans `index.html` par le prenom souhaite.

### Modifier le poeme
Editer les balises `<p class="poem-line">` dans la section `#poem` de `index.html`.

### Modifier la melodie
Ajuster le tableau `melody` dans `script.js` avec les frequences et durees souhaitees.

---

## Compatibilite

| Navigateur | Support |
|-----------|---------|
| Chrome 80+ | Complet |
| Firefox 80+ | Complet |
| Safari 14+ | Complet |
| Edge 80+ | Complet |
| Mobile Chrome | Complet |
| Mobile Safari | Complet |

### Notes
- Le curseur coeur est desactive sur les appareils tactiles
- `prefers-reduced-motion` desactive les animations pour les utilisateurs sensibles
- Le site fonctionne hors ligne une fois charge (pas de requetes externes sauf Google Fonts)

---

## Accessibilite

- **prefers-reduced-motion** : toutes les animations sont desactivees si l'utilisateur a active cette preference
- **Labels ARIA** : boutons de navigation avec `aria-label`
- **Contraste** : texte lisible sur tous les fonds
- **Navigation clavier** : les elements interactifs sont focusables
- **Pas d'autoplay audio** : la musique doit etre activee manuellement

---

Fait avec amour pour Kenza.
