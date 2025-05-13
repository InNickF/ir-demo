# InUI Library with ReactJS

## Tech

This library uses an Hexagonal Architecture and the follow tech list will sort by every architecture category:

### Presentation

- ReactJS
- Tailwind and Vanilla CSS

### Application

- ReactJS (Hooks)

### Domain

- Typescript

## Folders Structure

```
├── .turbo
├── .dist
├── node_modules/
├── src/
|   ├── lib/: Stories source code.
|   |   ├──assets/: Static files and stylesheets used in the library.
|   |   |  ├──fonts/: Font files.
|   |   |  └──styles/: CSS config files
|   |   |     ├──vars/
|   |   |     |  ├──animations.css: Animations classes.
|   |   |     |  ├──colors.css: Color palette.
|   |   |     |  ├──fonts.css: Font config.
|   |   |     |  ├──index.css: Main vars importing file.
|   |   |     |  └──shadows.css: Shadows styles config.
|   |   |     |
|   |   |     ├──custom.css: Classes that don't belong to a specific css file.
|   |   |     ├──index.css: Main styles importing file.
|   |   |     └──tailwind.css: Tailwind override classes.
|   |   |
|   |   ├──components/: Base components.
|   |   |  ├──data-entry/: Components that must handle data from users.
|   |   |  ├──feedback/: Components that must inform or confirm events to users.
|   |   |  ├──general/: Common components.
|   |   |  ├──layout/: Components that compose UIs.
|   |   |  ├──data-display/: Components that must show data.
|   |   |  ├──navigation/: Components that help users to navigate.
|   |   |  ├──other/: Other components without clear categorization.
|   |   |  ├──utils/: Helpers or utilities.
|   |   |  |  └──types/: Reusable Typescript types.
|   |   |  └──README.md: Specifies the folder destination of each component and internal structure.
|   |   |
|   |   ├──hooks/: Reactjs reusable hooks.
|   |   └──index.ts/: Exporting file of each component of the library.
|   |
|   ├──App.tsx: ReactJS app for testing components.
|   ├──main.tsx
|   └──vite-env.d.ts
|
├── .eslintrc.js
├── .gitignore
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```
