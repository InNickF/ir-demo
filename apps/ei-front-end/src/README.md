# SRC Folder

This is the base code folder, here is the entire application.

## Folder Architecture

```
.
├── commons/: Common code that is reusable cross the entire app.
|   ├── assets/: Static files to be imported inside components.
|   ├── components/: Common and base components to reuse across entire app.
|   ├── domain/: Common Business logic (Pure JavaScript/TypeScript)
|   ├── hooks/: Common Reusable ReactJS Hooks.
|   ├── layouts/: Application UI layouts.
|   ├── styles/: CSS folder
|   ├── typing/: TypeScript interfaces and types.
|   └── utils/: Helpers or utilities.
|
|
├── modules/: Contains isolated app modules.
├── pages/: Nextjs file routing system
├── services/: Global HTTP data fetching and management system.
└── store/: Global state management system (Redux).
      └── modules/: Global app modules.
```
