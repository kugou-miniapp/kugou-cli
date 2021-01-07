# <%= projectName %>

## 重要文件
- public/app.json：小程序配置文件，开发环境下修改后可以实时更新到手机小程序中(小程序会从访问路径的根目录找app.json)

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### 开发者工具

利用开发者工具的远程调试功能，可以加速调试设备中的页面，下面简单介绍如何启用开发者工具

- 首先，若没有全局安装```react-devtools```需要先安装

```bash
npm i -g react-devtools
# or
yarn global add react-devtools
```

- 其次，在```.env```配置环境变量REACT_APP_DEVTOOL=true

- 最后，在终端执行```react-devtools```命令启动开发者工具

```bash
react-devtools
```

## 备注
- 不需要用动态路由或动态加载功能，因为在小程序离线包下无意义
- 状态管理用useContext和useReducer处理
