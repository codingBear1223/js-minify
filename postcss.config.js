module.exports = {
  plugins: [
    // 使用 cssnano 插件来优化和压缩 CSS
    // preset: "default" 使用默认配置，会执行以下优化：
    // - 合并重复的规则
    // - 删除注释
    // - 优化字体权重
    // - 压缩颜色值
    // - 删除空格和无用代码等
    require("cssnano")({
      preset: "default",
    }),
    require("autoprefixer"),
    require("postcss-nested"),
  ],
};
