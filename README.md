# Vue Hot Loader

This Loader forked from [vue-hot-loader](https://github.com/jshmrtn/vue-hot-loader),
 And fixed any problems, such as union name caused MaxStack problems and so on.

## Why

The standard [`vue-loader`](https://github.com/vuejs/vue-loader) is hard to use with standard webpack loaders like the html loader. (If you want to use html interpolation for example.)

This loader only adds HMR capabilities to your normal JS code without the need to override all the loaders you know from other webpack / JS projects.

## Usage

Install `vue-hmr-loader` via `npm` or `yarn`.

```bash
yarn add vue-hmr-loader #OR
npm install vue-hmr-loader --dev
```

Add a loader in your webpack configuration.

**use on js files**

```js
module.exports = {
    // ...
    loaders: [
        {
            test: /src\/vue-components\/.*\.js$/,
            exclude: /node_modules/,
            loader: 'vue-hmr-loader',
        },
    ],
};
```

**use on ts files**

```js
module.exports = {
    // ...
    loaders: [
        {
            test: /src\/vue-components\/.*\.ts$/,
            exclude: /node_modules/,
            use: [{
                loader: 'vue-hmr-loader'
            }, {
                loader: 'ts-loader',
                options: {
                    appendTsSuffixTo: [/\.vue$/]
                }
            }]
        }
    ],
};
```

Then, write a vue component in your js/ts file

```js
import template from './component.html';
import './component.less';
export default {
    name: 'component',
    template,
};
```

## Notice

you must export a Vue component. if your export is a function/json/or others such as, this loader will be broken. so your webpack rules are very important.

## More Info

Read: [vue-hot-loader](https://www.npmjs.com/package/vue-hot-loader)