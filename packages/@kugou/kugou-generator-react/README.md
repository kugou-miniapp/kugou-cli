# `@kugou-miniapp/kugou-generator-react`

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

## 备注
- 不需要用动态路由或动态加载功能，因为在小程序离线包下无意义
- 状态管理用useContext和useReducer处理
