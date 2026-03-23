# Kata RAG : Le Detective du Bureau 🕵️‍♂️

Bienvenue dans ce Kata dedie au **Retrieval-Augmented Generation (RAG)**.

L'objectif est de transformer une IA "generique" en un expert metier capable de
repondre precisement sur des donnees privees (votre projet, votre entreprise,
votre documentation).

## 🎯 Objectifs pedagogiques

* Comprendre la difference entre la memoire d'entrainement du LLM et sa
  **memoire de travail** (contexte).
* Maitriser le flux **Indexation -> Recherche Semantique -> Generation**.
* Apprendre a reduire les **hallucinations** en imposant une source de verite.

## 🛠️ Pre-requis

1. Installez l'outil de RAG vectoriel [easy-rag-cli](https://github.com/dishtam/easy-rag)
   present dans les dependances du projet :

    ```bash
    npm install
    ```

2. Configurez votre cle API OpenAI :

    ```bash
    export OPENAI_API_KEY='votre-cle-api'
    ```

## 🚀 Mission

Vous travaillez sur le projet **Phoenix**.

Vous disposez de documents confidentiels dans le dossier `./docs`.

Votre mission est de rendre l'IA capable de repondre aux questions des
nouveaux arrivants sans faire de "Vibe Coding".

### Etape 1 : Creer la base de connaissances

Lisez les trois fichiers `.txt` du dossier `./docs`. Ils contiennent les
informations sur :

* La culture Craft d'Arolla (Double-run testing).
* Les codes secrets de la machine a cafe (et qui appeler en cas de pepin).
* Le glossaire metier (Ubiquitous Language) du projet Phoenix.

### Etape 2 : L'indexation vectorielle

Lancez l'indexation pour transformer vos textes en vecteurs de sens :

```bash
npm run rag:index
```

### Etape 3 : Le serveur

Lancer le serveur :

```bash
npm run rag:serve
```

### Etape 4 : L'investigation

Testez votre RAG avec les questions suivantes :

1. *"Comment s'appelle un utilisateur dans le projet Phoenix ?"*
   (Verifiez qu'il ne repond pas 'Client').
2. *"Qui possede la cle de reinitialisation de la machine a cafe ?"*
3. *"Quelle est la difference entre un Vibe Coder et un Software Crafter ?"*

---

## 👨‍🏫 Note pour l'Animateur

**Titre :** Animation du Kata RAG "Le Detective du Bureau"
**Duree totale :** 40 minutes

## ⏱️ Deroule suggere

* **00:00 - 05:00 :** Introduction au concept de RAG. Expliquez que le LLM est
  **stateless** : sans RAG, il ne connait pas Jean-Claude ni le projet
  Phoenix.
* **05:00 - 10:00 :** Setup et creation des fichiers. Insistez sur
  l'importance d'utiliser des termes precis (Ubiquitous Language).
* **10:00 - 15:00 :** Indexation. Expliquez que le texte est transforme en
  **embeddings** (vecteurs) pour permettre la recherche semantique.
* **15:00 - 30:00 :** Tests et observations. C'est le moment des
  "Aha! Moments".
* **30:00 - 40:00 :** Debriefing sur le Context Engineering.

## 💡 Points cles a demontrer

1. **Le test "Sans RAG" :** Demandez aux stagiaires de poser une question a
   ChatGPT *avant* d'utiliser le script. L'IA va halluciner ou dire qu'elle ne
   sait pas.
2. **La Recherche Semantique :** Montrez que si on demande
   "Qui repare l'appareil a expresso ?", le RAG trouve l'info meme si le
   fichier parle de "machine a cafe". C'est la puissance des vecteurs.
3. **Le Garde-Fou (Hallucination) :** Demandez : *"Quel est le code de
   l'ascenseur ?"*. Si le RAG est bien configure (prompt systeme restrictif),
   l'IA doit repondre "Je ne sais pas" car l'info n'est pas dans les fichiers.
   C'est du **determinisme**.

## ⚠️ Pieges courants

* **Oubli de l'indexation :** Si on modifie un fichier `.txt`, il faut relancer
  `easy-rag index` sinon l'IA reste sur l'ancienne version. C'est une bonne
  occasion de parler de **synchronisation du contexte**.
* **Cle API expiree :** Toujours avoir une cle de secours ou proposer Ollama en
  local pour les stagiaires sans cle.
* **Temperature trop haute :** Si l'IA commence a raconter n'importe quoi malgre
  le contexte, rappelez que le Context Engineering necessite une **temperature
  proche de 0** pour etre fiable.

## 🏁 Conclusion

Terminez en expliquant que le RAG est la brique de base de la
**"Living documentation"** : le code et la doc deviennent la source de verite
immediate de l'IA.
