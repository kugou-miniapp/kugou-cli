# `@kugou-miniapp/cli`

## 一、Install
```bash
npm install -g @kugou-miniapp/cli
or
yarn global add @kugou-miniapp/cli
```

## 二、Usage

### 2.1 初始化项目

初始化一个新项目

```bash
kugou init <projectName>
```

```
选项：
  -h, --help       显示帮助信息                                           [布尔]
  --appid          小程序id
  --appkey         小程序权限校验码
  --generator, -g  项目初始化使用模板
```

### 2.2 创建入口

根据模板创建入口

```bash
kugou generate [name]
```

```
选项：
  -h, --help  显示帮助信息                                                [布尔]
  --force     存在同名文件时，是否直接覆盖                [布尔] [默认值: false]
```

### 2.3 发布离线包

发布小程序离线包；version格式x.y.z，默认取最新的版本最后加1

```bash
kugou publish [version]
```

```
选项：
  -h, --help                 显示帮助信息                                 [布尔]
  --path, -p                 离线包地址，不填自动当前项目的build命令并上传
  --description, --desc, -d  离线包简介，10-32个字符                      [必需]
```

备注：

- 发布前需要在```public/app.json```中填写appid和appkey参数
- [appkey获取接口](http://doc.kugou.net/showdoc-master/web/#/11?page_id=5878)

### 2.4 预览小程序

预览特定版本的小程序

```bash
kugou preview <version>
```

```
选项：
  -h, --help  显示帮助信息                                                [布尔]
```

### 2.3 显示帮助
```bash
kugou -h
```

### 2.4 显示版本
```bash
kugou --version
```

## 三、模板

模板项目需要发布到npm(参考yeoman)，初始化时会自动全局安装所选模板，相比每次git clone可以有效利用本地缓存

模板项目命名规则：kugou-generator-*，支持任意scope前缀（如官方的两个模板@kugou-miniapp/kugou-generator-react、@kugou-miniapp/kugou-genenrator-vue）

## 四、开发计划
### 4.1 第一版

- 同类产品调研 [√]
- 命令行程序（create、version、help）[√]
- 官方模板项目 [√]
- 开放文档 [√]

### 4.2 第二版
- 预览二维码 [√]
- 自动上传包体 [√]
- 欢迎页完善 [√]
- 接入vue、react开发者工具 [√]

### 4.3 第三版
- 支持第三方模板、模板更新检查
- 模块插件化、管理
- 可视化操作
- 数据埋点 [√]

## 五、参考
### 5.1 yeoman
[官网](https://yeoman.io/)
[github](https://github.com/yeoman/yeoman)

### 5.2 kfc-command
[官网](http://doc.kugou.net/showdoc-master/web/#/5?page_id=4333)
[gitlab](http://git.kugou.net/fe-lab/kfc-command)

### 5.3 vue-cli
[官网](https://cli.vuejs.org/zh/)
[github](https://github.com/vuejs/vue-cli)

### 5.4 angular-cli
[官网](https://cli.angular.io/)
[github](https://github.com/angular/angular-cli)

### 5.5 umijs
[官网](https://umijs.org/)
[github](https://github.com/umijs/umi)

