# Documentation app of InUI Library with React

This app use storybook with vite and ReactJS to generate documentation.

## Folders Structure

```
├── .storybook
├── .turbo
├── node_modules/
├── public
├── src/
|   ├── stories/: Stories source code (It follows library component structure).
|   |   ├──data-entry/: Components that must handle data from users.
|   |   ├──feedback/: Components that must inform or confirm events to users.
|   |   ├──general/: Common components.
|   |   ├──layout/: Components that compose UIs.
|   |   ├──data-display/: Components that must show data.
|   |   ├──navigation/: Components that help users to navigate.
|   |   └──other/: Other components without clear categorization.
|   |
|   └──vite-env.d.ts
|
├── storybook-static/
├── .eslintrc.js
├── .gitignore
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── tailwind.config.js
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```
