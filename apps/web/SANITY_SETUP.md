# Configuration Sanity.io

## Étapes à suivre sur Sanity.io

### 1. Créer un compte et un projet Sanity

1. Va sur [sanity.io](https://www.sanity.io/) et crée un compte (gratuit)
2. Clique sur "Create new project"
3. Donne un nom à ton projet (ex: "boujaddi-blog")
4. Choisis le dataset "production"
5. Note ton **Project ID** - tu en auras besoin

### 2. Installer Sanity Studio (optionnel - si tu veux un studio local)

Si tu veux héberger ton studio localement :

```bash
cd apps/web
npx sanity@latest init
```

Suis les instructions :
- Use existing project
- Sélectionne ton projet
- Dataset: production
- Output path: `./studio`

### 3. Configurer les variables d'environnement

Ouvre le fichier `.env.local` et remplace `your-project-id` par ton vrai Project ID :

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=ton-vrai-project-id
NEXT_PUBLIC_SANITY_DATASET=production
```

### 4. Configurer le schéma sur Sanity

**Option A : Via Sanity Studio en ligne (plus simple)**

1. Va sur [sanity.io/manage](https://www.sanity.io/manage)
2. Sélectionne ton projet
3. Clique sur "Studio" dans le menu
4. Ça va te diriger vers `https://ton-projet.sanity.studio`
5. Dans Vision (l'onglet de requêtes), tu peux créer des documents directement

**Option B : Via un Studio local**

Si tu as installé le studio localement :

1. Crée `studio/schemaTypes/article.ts` avec le contenu de `/apps/web/sanity/schema.ts`
2. Dans `studio/schemaTypes/index.ts`, importe et exporte le schéma :
   ```typescript
   import { articleSchema } from './article'
   export const schemaTypes = [articleSchema]
   ```
3. Lance le studio : `cd studio && npm run dev`
4. Ouvre http://localhost:3333

### 5. Créer ton premier article

Dans Sanity Studio (en ligne ou local) :

1. Clique sur "Article" dans le menu
2. Clique sur "Create new Article"
3. Remplis les champs :
   - **Title** : Le titre de ton article (ex: "Mon premier article")
   - **Slug** : Clique sur "Generate" pour créer le slug automatiquement
   - **Published at** : Choisis la date de publication
   - **Body** : Écris ton contenu (supporte le formatage : gras, italique, listes, titres, etc.)
4. Clique sur "Publish"

### 6. Tester

Une fois ton article publié :
1. Redémarre ton serveur Next.js si nécessaire
2. Va sur http://localhost:3000
3. Tu devrais voir ton article dans la liste !
4. Clique dessus pour le lire

## Structure du schéma Article

Chaque article contient :
- **title** : Le titre (string, requis)
- **slug** : L'URL de l'article (auto-généré depuis le titre)
- **publishedAt** : Date de publication (datetime, requis)
- **body** : Le contenu (Portable Text - rich text)

## API Endpoints configurés

Le code fetch automatiquement depuis Sanity :
- Page d'accueil : Liste tous les articles triés par date (plus récent en premier)
- Page article : Récupère l'article complet par son slug

## Besoin d'aide ?

- Documentation Sanity : https://www.sanity.io/docs
- Portable Text : https://www.sanity.io/docs/presenting-block-text
- Vision (pour tester les requêtes) : disponible dans ton Studio
