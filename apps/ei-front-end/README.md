# NextJS Scaffolding

![Build status](https://img.shields.io/badge/build-passing-brightgreen) ![Platform](https://img.shields.io/badge/node--lts-%3E%3D%2016.13.2-brightgreen)

#### _**An approximation to write clean/declarative ReactJS code and NextJS applications.**_

This is a Next.js project bootstrapped with `yarn create next-app` and organized according to [Hexagonal Software Architecture](<https://en.wikipedia.org/wiki/Hexagonal_architecture_(software)>) and SOLID principles.

<details>
  <summary>Table of content</summary>

- [Getting Started](#getting-started)
- [Setup](#setup)
- [Tech](#tech)
- [Folder structuring and docs](#folder-structuring-and-docs)
- [Gitflow](#gitflow)
- [Continuous Integration](#continuous-integration)
- [Production build](#production-build)
- [Authors](#authors)

</details>

### Manually Setup

As all NodeJS project you will able to run this project manually, first step is run `cd ./app` to be inside of the project folder, then you can execute in your terminal:

```bash
$ yarn install
# and
$ yarn dev
```

#### **Requirements**

- Git
- NodeJS >=16.13.2 (LTS)
- yarn (recommended) or npm.

## Tech

This scaffolding uses a Hexagonal Architecture, next tech list will sort by every architecture category:

### Presentation

- NextJS
- ReactJS
- Tailwind (Base/Utilities only) and Vanilla CSS
- GSAP (Animation)
- ThreeJS/react-three-fiber and friends (3D Library).
- InUI Library

### Application

- ReactJS (Hooks)

### Domain

- Typescript (Recommended) or...
- Vanilla JavaScript

### Infrastructure

- Axios (Fetcher)
- React Query (Data management)
- Context API

## Folder structuring and docs

It is important to know that each folder in this architecture has a clear objective but none is essential, you can delete or add by your requirements.

Here is the general folder information:

```
.
├── public/: Static files to be serve by web server.
├── src/: Application source code.
|   ├── __tests__/: Jest global test folder.
|   ├── commons/: Common code that is reusable cross the entire app.
|   |   ├── assets/: Static files to be imported inside components.
|   |   ├── components/: Common and base components to reuse across entire app.
|   |   ├── domain/: business logic (Pure JavaScript/TypeScript)
|   |   ├── hooks/: reusable ReactJS Hooks.
|   |   ├── layouts/: Application UI layouts.
|   |   ├── styles/: CSS folder
|   |   ├── typing/: TypeScript interfaces and types.
|   |   └── utils/: Helpers or utilities.
|   |
|   |
|   ├── modules/: Contains isolated app modules.
|   ├── pages/: Nextjs file routing system
|   ├── services/: Global HTTP data fetching and management system.
|   └── store/: Global state management system (Redux).
|        └── modules/: Global app modules.
|
├── .eslintrc.json: ESlint configuration (Linter).
├── tailwind.config.js: Tailwind configuration.
├── next-env.d.ts: NextJs types.
├── .env.local.example: Envs example file.
├── next.config.js: NextJS configuration.
├── package.json: Dependencies file.
├── tsconfig.json: Typescript configuration.
└── .gitignore: This file allows exclude files for version management.



```

**NOTE: Each important folder has its own README file.**

## Gitflow

We recommend use [gitflow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow) as versioning workflow, also we integrate commitizen to help you to create commits.

## Production build

### Environment variables

```bash
NEXT_PUBLIC_API_BASE_URL= # API (back-end) base url.
NEXT_PUBLIC_AMCHARTS_5_KEY= # Amcharts 5 (Charts library) product key.
NEXT_PUBLIC_MAP_BOX_PUBLIC_TOKEN= # Mapbox (Maps library) public token.
```

### Build Commands

You must run this commands in the root (mono repo) directory.

```bash
$ yarn install
# and
$ yarn build:ei
```

Then, you will have a `/apps/ei-front-end/out` directory with the static files.

## Authors

- Nick Fuenmayor ([@NickFuenmayor\_](https://twitter.com/NickFuenmayor_)) – [Github](https://github.com/InNickF)
