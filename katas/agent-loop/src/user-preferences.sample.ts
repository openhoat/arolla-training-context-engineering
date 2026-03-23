export const userPreferences: Record<
  string,
  { theme: string; language: string; notifications: boolean }
> = {
  alice: { theme: 'dark', language: 'fr', notifications: true },
  bob: { theme: 'light', language: 'en', notifications: false },
  charlie: { theme: 'dark', language: 'es', notifications: true },
}

// TODO: Ajouter la validation des préférences utilisateur
// TODO: Implémenter la persistance des préférences dans un fichier
// TODO: Ajouter un système de préférences par défaut pour les utilisateurs inconnus
// TODO: Créer une fonction pour exporter/importer les préférences en JSON
