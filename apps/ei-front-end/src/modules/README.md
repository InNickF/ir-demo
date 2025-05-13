# Modules folder

This folder contains every app module to organize the application structure.

Specifically, it encapsulates the logic associated with a task, plus the custom code to implement the task. An example of an application task might be a CRUD of users, updating customer information, creating a new order, or processing salary increases.

The idea is maintain organized, centralized by task and also shareable across the entire application, or in the best case, across multiple apps.

## Module folder architecture

In a nutshell folder architecture inside in a module it's too similar to `../commons` folder, the key different between this folders is the specificity, while commons structures code that is shared throughout the app, a module folder specializes in the solution that the module provides.

With that in mind here is the folder organization:

```
.
└── module/
    ├── __test__/: Global test module.
    ├── assets/: Static files to be imported inside components.
    ├── components/: Common and base components to reuse in the module.
    ├── domain/: Business logic (Pure JavaScript/TypeScript)
    ├── hooks/: Reusable ReactJS Hooks.
    ├── layouts/: Module UI layouts.
    ├── pages/: Pages to be imported in Nextjs file routing system.
    ├── services/: Module HTTP data fetching and management system.
    ├── store/: Module state management system (Redux).
    ├── styles/: CSS folder.
    ├── typing/: TypeScript interfaces and types.
    └── utils/: Helpers or utilities.
```
