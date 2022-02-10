# nuxt-local-state-machine-demo

## Build Setup

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# generate webpack analyze
$ yarn analyze
```

## Special Directories


### `composable`
folder or file name should be `kebab-case`

```
composable -> 💡 共用 composition api
├── index.js
├── scope
│   ├── use-provider -> 💡 similar react.createContext
│   │   └── index.js
│   ├── use-scope -> 💡 similar react.useContext
│   │   └── index.js
│   └── utils
│       └── index.js
└── use-state-machine -> 💡 state machine and nuxt's bridge
    └── index.js

```
### `helpers`
```
helpers
└── stateMachine -> 💡 stateMachine
    ├── core
    │   ├── computedGetters
    │   │   └── index.js
    │   ├── createActions
    │   │   └── index.js
    │   ├── createMutations
    │   │   └── index.js
    │   ├── createStateMachine
    │   │   └── index.js
    │   └── index.js
    └── utils
        ├── index.js
        └── index.test.js
```

## `file structure`
若 component 要使用 `composition-api`，在 component folder 下會有一個 `composable` folder 來放所有的 `composition-api` 
統一從 `composable/index.js` 當 entry point

> `composable` folder 底下可以有多個 composition-api，在從`composable/index.js` 引入給 component 使用

`index.vue` 做為最後被別的 component import 的 entry point 


```
components/pages/home
├── composable
│   ├── index.js -> 💡 執行 init function
│   └── index.test.js -> composition-api test
├── index.vue -> 💡 setup composition-api (execute composable/index.js)
└──  [your-child-components]
    ├── composable
    │   ├── index.js
    │   └── index.test.js
    └── index.vue

```

## `fakers`
存放假資料的 folder
## webpack analyze
![webpack analyze](./md/webpack-analyze.png)