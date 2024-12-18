const { minify } = require("terser");
const fs = require("fs-extra");
const path = require("path");
const code = `function sayHello() {
  console.log("Hello, world!");
}

sayHello();`;

const filePath = path.resolve(__dirname, "../src/index.js");
const readFile = () => {
  return fs.readFileSync(filePath, "utf-8");
};

//执行代码压缩
const minifiedCode = async () => {
  const newCode = await minify(readFile(), {
    compress: {
      drop_console: true, // 删除 console.log
      drop_debugger: true, // 删除 debugger
      dead_code: true, // 删除死代码
      unused: true, // 删除未使用的代码
    },
    ecma: 5, // 指定 ECMAScript 版本
    toplevel: true, // 允许顶级函数重命名
    parse: {
      bare_returns: true, // 允许返回语句作为表达式
    },
    mangle: {
      toplevel: true, // 全局变量重命名
    },
  });
  console.log(newCode.code);
  return newCode.code;
};

/**
 * 输出到文件
 */
const writeFile = (code) => {
  fs.writeFileSync(path.resolve(__dirname, "../dist/index.js"), code, "utf-8");
};
fs.ensureDirSync(path.resolve(__dirname, "../dist")); // 确保dist目录存在

minifiedCode().then((code) => writeFile(code)); // 压缩代码并输出到文件
