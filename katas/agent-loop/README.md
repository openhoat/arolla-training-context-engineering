# Kata : La Boucle Agentique Minimale 🔄

L'objectif de ce Kata est de comprendre le fonctionnement interne d'un agent IA
en implementant une boucle **Plan-Act-Observe** simplifiee.

## 🎯 Objectifs pedagogiques

* Comprendre le concept de **statelessness** des LLM et l'importance de la
  **memoire du contexte**.
* Simuler le mecanisme d'**appel d'outils (Tool Calling)**.
* Visualiser comment un agent progresse etape par etape vers un objectif
  complexe.

## 🛠️ Pre-requis

Avant de commencer, installez les dependances :

```bash
npm install
```

## 🚀 Votre Mission

Vous allez utiliser un script qui simule un agent IA. Cet agent dispose d'un
"faux LLM" (une fonction deterministe) et de trois "faux outils".

### Etape 1 : Analyser le code

Ouvrez le fichier `src/agent.ts` :

1. Observez comment le `prompt` est construit a chaque tour de boucle en
   incluant la `memory`.
2. Regardez comment le "LLM" decide quel outil appeler.
3. Voyez comment les resultats des outils sont reinjectes dans la memoire pour
   le tour suivant.

### Etape 2 : Lancer l'agent

Lancez l'agent avec la commande suivante :

```bash
npm run agent:loop
```

Suivez les instructions a l'ecran en appuyant sur **Entree** a chaque etape
pour voir l'agent reflechir et agir.

### Etape 3 : Challenge (Stagiaires) - Ajouter l'outil `get_code_weather`

Votre mission est d'ajouter un nouvel outil permettant a l'agent d'analyser un
fichier source pour determiner sa "meteo du code". L'agent doit pouvoir
utiliser cet outil pour atteindre un objectif specifique.

**Concept :** La meteo du code est determinee par le nombre de TODOs dans le
fichier :

* **STORMY** (orageux) : 3+ TODOs
* **SUNNY** (ensoleille) : moins de 3 TODOs

**Taches a realiser :**

1. **Ajouter l'outil `get_code_weather` dans `src/tools.ts`**
   * Creez une fonction qui prend un chemin de fichier en parametre
   * Elle doit lire le fichier et compter les occurrences de "TODO"
   * Retournez "STORMY" si >= 3 TODOs, sinon "SUNNY"
   * Ajoutez l'outil au tableau `tools` avec un nom et une description clairs

2. **Mettre a jour la logique de l'agent dans `src/agent-logic.ts`**
   * Ajoutez une logique pour detecter quand l'objectif demande la meteo du
     code
   * Faites generer un appel a `get_code_weather(<fichier>)` par l'agent

3. **Tester votre implementation**
   * Lancez l'agent avec un objectif meteo :
     `npm run agent:loop "Quelle est la meteo du code dans
     src/user-preferences.sample.ts ?"`
   * Verifiez que l'agent utilise bien le nouvel outil
   * Le fichier `user-preferences.sample.ts` contient 4 TODOs, donc la meteo
     devrait etre "STORMY" (orageuse)

**Indices :**

* Regardez comment les outils existants (`complex_calculation`,
  `get_secret_info`) sont implementes
* L'agent doit detecter des mots-cles comme "meteo", "weather", "code", "todo"
  dans l'objectif
* N'oubliez pas d'ajouter le resultat de l'outil a la memoire pour que l'agent
  puisse formuler sa reponse finale

---

### Etape 4 : Challenge (Avance) - Personnaliser l'objectif

Une fois votre outil meteo du code fonctionnel, testez avec differents
objectifs :

```bash
npm run agent:loop "Calculer 15 + 27"
npm run agent:loop "Quelle est la meteo du code dans src/user-preferences.sample.ts ?"
npm run agent:loop "Donne-moi le secret et la meteo du code dans src/tools.ts"
```

---

## 👨‍🏫 Note pour l'Animateur

**Duree suggeree :** 20-30 minutes.

Ce kata est ideal en debut de formation pour illustrer que :

1. **L'IA est amnesique** : sans le tableau `memory` reinjecte dans le prompt,
   elle oublierait ce qu'elle a fait au tour precedent.
2. **L'Ingenierie du Contexte** consiste ici a savoir *quoi* stocker dans la
   memoire pour que l'IA reste sur les rails.
3. **La boucle de feedback** est ce qui transforme un simple Chat en un Agent
   autonome.

## 🌿 Gestion des branches Git

**Branche `main`** : Contient le kata de base avec 3 outils (`get_secret_info`,
`complex_calculation`, `get_current_time`).

**Branche `agent-loop-get-code-weather`** : Contient la solution complete du
challenge etape 3 avec l'outil `get_code_weather` ajoute et la logique de
l'agent mise a jour.

Pour basculer entre les versions :

```bash
git checkout main                    # Version de base pour les stagiaires
git checkout agent-loop-get-code-weather  # Solution complete
```

## 🏁 Conclusion

Ce kata demontre le mecanisme fondamental d'un agent IA : la boucle de
feedback Plan-Act-Observe. Sans reinjection du contexte (memoire), l'IA est
incapable de maintenir un cap vers un objectif complexe.
