module.exports = {
  presets: [
    '@vue/app'
  ],
    // 新的 vue-cli 默认禁止了 commonjs 语法
    // 可以添加 babel 插件解决
  plugins: [
      [
          '@babel/plugin-transform-modules-commonjs',
          {
              allowTopLevelThis: true,
          },
      ],
  ]
}
