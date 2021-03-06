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
composable -> π‘ ε±η¨ composition api
βββ index.js
βββ scope
β   βββ use-provider -> π‘ similar react.createContext
β   β   βββ index.js
β   βββ use-scope -> π‘ similar react.useContext
β   β   βββ index.js
β   βββ utils
β       βββ index.js
βββ use-state-machine -> π‘ state machine and nuxt's bridge
    βββ index.js

```
### `helpers`
```
helpers
βββ stateMachine -> π‘ stateMachine
    βββ core
    β   βββ computedGetters
    β   β   βββ index.js
    β   βββ createActions
    β   β   βββ index.js
    β   βββ createMutations
    β   β   βββ index.js
    β   βββ createStateMachine
    β   β   βββ index.js
    β   βββ index.js
    βββ utils
        βββ index.js
        βββ index.test.js
```

## `file structure`
θ₯ component θ¦δ½Ώη¨ `composition-api`οΌε¨ component folder δΈζζδΈε `composable` folder δΎζΎζζη `composition-api` 
η΅±δΈεΎ `composable/index.js` ηΆ entry point

> `composable` folder εΊδΈε―δ»₯ζε€ε composition-apiοΌε¨εΎ`composable/index.js` εΌε₯η΅¦ component δ½Ώη¨

`index.vue` εηΊζεΎθ’«ε₯η component import η entry point 


```
components/pages/home
βββ composable
β   βββ index.js -> π‘ ε·θ‘ init function
β   βββ index.test.js -> composition-api test
βββ index.vue -> π‘ setup composition-api (execute composable/index.js)
βββ  [your-child-components]
    βββ composable
    β   βββ index.js
    β   βββ index.test.js
    βββ index.vue

```

## `fakers`
ε­ζΎεθ³ζη folder
## webpack analyze
![webpack analyze](./md/webpack-analyze.png)