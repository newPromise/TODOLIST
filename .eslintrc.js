/**
 * Created by dell-dell on 2017/9/30.
 */
module.exports = {
    root: true,   //  eslint找到这个标识后，不会再去父文件夹中找eslint的配置文件
    parser: 'babel-eslint',   //使用babel-eslint来作为eslint的解析器
    parserOptions: {      // 设置解析器选项
        sourceType: 'module'    // 表明自己的代码是ECMAScript模块
    },
    // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
    extends: 'standard',  // 继承eslint-config-standard里面提供的lint规则
    // required to lint *.vue files
    plugins: [    // 使用的插件eslint-plugin-html. 写配置文件的时候，可以省略eslint-plugin-
        'html'
    ],
    // 启用额外的规则或者覆盖基础配置中的规则的默认选项
    rules: {
        'semi': 0,
        'arrow-parens': 0,
        'generator-star-spacing': 0,
        'comma-dangle': 0,
        'jsx-a11y/href-no-hash': 0,
        'import/extensions': 0,
        'import/no-unresolved': 0,
        'func-names': 0,
        'space-before-function-paren': 0,
        'import/no-extraneous-dependencies': 0,
        'max-len': 0,
        'no-plusplus': 0,
        'no-param-reassign': 0,
        'spaced-comment': 0,
        'no-restricted-syntax': 0
    },
    globals: {    // 声明在代码中自定义的全局变量
        'CONFIG': true
    },
    env: {            // 定义预定义的全局变量,比如browser: true，这样你在代码中可以放心使用宿主环境给你提供的全局变量。
        browser: true, // browser global variables.
        node: true, // Node.js global variables and Node.js scoping.
        worker: true, // web workers global variables.
        mocha: true, // adds all of the Mocha testing global variables.
        phantomjs: true, // PhantomJS global variables.
        serviceworker: true // Service Worker global variables.
    }
};