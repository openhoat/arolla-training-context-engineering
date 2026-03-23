# Arolla Training - Context Engineering 🎓

Bienvenue dans le dépôt de ressources de la formation **Context Engineering**. Ce projet
regroupe les supports théoriques et les exercices pratiques (Katas) pour maîtriser
l'ingénierie du contexte avec les LLM.

---

## Table des Matières

1. **[Slideshow : Théorie et Concepts](./slides/context-engineering.md)**
2. **[Kata d'introduction : La boucle agentique](./katas/agent-loop/)** - Comprendre la mécanique interne.
3. **[Kata 1 : Model Context Protocol (MCP)](./katas/mcp/)** - Donner des "mains" à votre IA.
4. **[Kata 2 : Retrieval-Augmented Generation (RAG)](./katas/rag/)** - Donner une mémoire à votre IA.

---

## Setup Global

Pour installer toutes les dépendances nécessaires aux différents exercices, lancez simplement :

```bash
npm install
```

---

## Guide de Navigation

### 1. Slideshow (Théorie)

Les supports sont au format **Marp** (Markdown), régénérés depuis le PDF source.

- **Visualisation (VS Code)** : Utilisez l'extension **Marp for VS Code**
  (`Ctrl+Shift+P` -> `Marp: Open Preview to the Side`).
- **Rendu HTML** : `npm run slides:build` (génère `dist/slides/index.html`).
- **Rendu PDF** : `npm run slides:pdf` (génère `dist/slides/context-engineering.pdf`).
- **Mode Présentation Live** : `npm run slides:serve`.
- **Régénération depuis le PDF** : `npm run slides:rebuild` (extrait le texte de
  `ContextEngineering4Devs_training.pdf` et regénère un `context-engineering.md` éditable).
- Emplacement : `slides/context-engineering.md`.

### 2. Katas (Pratique)

Chaque kata est autonome dans son répertoire mais partage les dépendances globales :

- **Agent Loop** : Simulez une boucle agentique simple pour comprendre l'importance du
  contexte. Script : `npm run agent:loop`.
- **MCP** : Apprenez à créer un serveur MCP pour analyser votre code local. Scripts : `npm run mcp:build`.
- **RAG** : Apprenez à indexer des documents et à interroger une base de connaissance
  locale. Scripts : `npm run rag:ask`, `npm run rag:index`.

### 3. Maintenance et Qualité

Le projet utilise des outils globaux pour assurer la qualité du code sur l'ensemble du dépôt :

- **Formatage** : `npm run format` (via Biome)
- **Qualité (Lint/Check)** : `npm run qa` ou `npm run qa:fix`

### 4. Slides — Cycle de vie

| Fichier | Tracké Git | Usage |
|---|---|---|
| `slides/slides.tar.gz.enc` | ✅ Oui | Archive chiffrée canonique (PDF + images + MD) |
| `slides/ContextEngineering4Devs_training.pdf` | ❌ Non (généré) | Source pour `slides:rebuild` |
| `slides/context-engineering.md` | ❌ Non (généré) | Slides Marp éditables, régénéré depuis le PDF |
| `slides/images/` | ❌ Non (généré) | 6 images résiduelles (slides purement visuelles) |

Pour régénérer le MD après une modification du PDF :

```bash
npm run slides:rebuild   # extrait le texte, génère le nouveau MD
npm run slides:build     # vérifie le rendu HTML
npm run slides:pdf       # génère le PDF final
```

Pour mettre à jour l'archive chiffrée (après modifications validées localement) :

```bash
npm run slides:encrypt   # recrée slides.tar.gz.enc
```

---

## Ressources

- https://korben.info/claude-code-depot-malveillant-prompt-injection.html
- https://role-confusion.github.io/
- https://glama.ai/ (https://www.reddit.com/r/mcp/comments/1hm3g2s/glama_mcp_server_directory/)
- https://github.com/specmind/specmind/blob/main/CONSTITUTION.md

---

## Formateurs

Ce contenu a été élaboré par :

- **Cyrille Martraire** (CTO Associé Arolla)
- **Olivier Penhoat** (Senior Software Craft Engineer Arolla)

---
© 2026 Arolla - [www.arolla.fr](https://www.arolla.fr/formations/context-engineering/)
