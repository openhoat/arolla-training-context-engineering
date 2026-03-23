# Kata MCP : Le Butler Domotique 🏠

L'objectif de ce Kata est de donner des "mains" a votre IA. Au lieu de
copier-coller manuellement vos fichiers dans le chat ("tea-spooning"), vous
allez creer un **outil (Tool)** que l'IA appellera elle-meme pour piloter une
maison connectee simulee.

## 🎯 Objectifs pedagogiques

* Comprendre le fonctionnement du **Model Context Protocol (MCP)**.
* Transformer un LLM passif en un **Agent autonome** capable d'interagir avec
  un systeme local.
* Maitriser la declaration d'outils (Tools) et leur implementation en
  TypeScript.
* Decouvrir comment l'IA peut orchestrer plusieurs appels d'outils pour
  accomplir une intention complexe.

## 🛠️ Installation

1. Installez les dependances necessaires :

    ```bash
    npm install
    ```

2. Assurez-vous d'avoir **votre agent IA** installe sur votre machine
   (ex : Claude Desktop, ou tout autre client compatible MCP).

## 🚀 Votre Mission

Vous allez creer un serveur MCP nomme `smart-house`. Ce serveur doit exposer
deux outils capables de lire et modifier l'etat d'une maison connectee simulee
via un fichier JSON local.

### Etape 1 : Completer le serveur MCP

Ouvrez le fichier `house-server.ts` et completez la logique des deux outils :

1. **`readHouseState()`** : Lisez le fichier `house.json` et retournez son
   contenu parse en JSON.
2. **`writeHouseState(state)`** : Convertissez l'objet `state` en JSON formate
   (indentation de 2 espaces) et ecrivez-le dans le fichier.
3. **`set_device_state`** : Completez la logique pour modifier l'etat d'un
   appareil specifique :
    * Lire l'etat actuel
    * Verifier que l'appareil existe
    * Mettre a jour sa valeur
    * Sauvegarder le nouvel etat

### Etape 2 : Configurer votre agent IA

Ajoutez votre serveur dans la configuration des outils MCP de votre agent
(`.mcp.json` ou configuration equivalente selon votre client) :

```json
{
  "mcpServers": {
    "smart-house": {
      "command": "npx",
      "args": ["tsx", "./katas/mcp/src/house-server.ts"]
    }
  }
}
```

### Etape 3 : L'IA en action

Redemarrez votre agent IA. Une icone d'outils MCP doit apparaitre (selon votre
client). Testez l'agent avec des scenarios naturels :

* *Question :* "Je vais me coucher, prepare la maison."
* *Observation :* L'IA doit appeler vos outils pour eteindre les lumieres,
  baisser le thermostat et armer l'alarme.
* *Question :* "Il fait un peu froid ici."
* *Observation :* L'IA doit augmenter la temperature du thermostat.
* *Question :* "Je pars au travail."
* *Observation :* L'IA doit eteindre tout, armer l'alarme et verrouiller la
  porte.

---

## 👨‍🏫 Note pour l'Animateur (Guide de session)

**Titre :** Animation du Kata MCP "Le Butler Domotique"
**Duree totale :** 40 minutes

## ⏱️ Deroule suggere

* **00:00 - 05:00 :** Introduction au MCP. Expliquez que le MCP est le
  **"standard USB"** pour connecter les IA aux outils locaux.
* **05:00 - 15:00 :** Phase de code. Les stagiaires implementent la
  lecture/ecriture du fichier JSON et la logique de modification d'etat.
* **15:00 - 25:00 :** Configuration de votre agent IA. C'est l'etape la plus
  delicate (chemins absolus, JSON valide).
* **25:00 - 40:00 :** Tests et debriefing sur les Agents.

## 💡 Points cles a demontrer (Le "Aha!" Moment)

1. **L'Inversion de Controle :** Ce n'est plus le developpeur qui donne l'info,
   c'est l'IA qui decide quand elle en a besoin. C'est le coeur du **Context
   Engineering** dynamique.
2. **L'Agent vs le Chat :** Montrez que l'IA peut desormais repondre a des
   questions sur l'etat de la maison que vous n'avez jamais partage dans le
   chat.
3. **L'Orchestration Multi-Tool :** Suggerez aux stagiaires de demander a l'IA
   : *"Je vais me coucher"*. L'IA doit automatiquement enchainer plusieurs
   appels d'outils (eteindre les lumieres, baisser le chauffage, armer
   l'alarme) pour accomplir cette intention complexe.

## ⚠️ Pieges courants (Checklist Animateur)

* **Chemins de fichiers :** Votre agent IA a generalement besoin de **chemins
  absolus** dans son fichier de configuration MCP. Un chemin relatif fera
  echouer la connexion.
* **Redemarrage :** Votre agent IA doit generalement etre **quitte
  completement et relance** pour prendre en compte les modifications du
  fichier de configuration.
* **Logs :** Si le serveur MCP crash, les erreurs s'affichent souvent dans les
  logs de votre agent IA (accessibles via le menu de l'app selon votre
  client). Montrez-leur comment deboguer un serveur "aveugle".

## 🏁 Conclusion

Expliquez que ce Kata est le premier pas vers le **"Meta-developpement"** :
coder des outils pour que l'IA puisse travailler sur notre environnement de
maniere autonome et securisee.
