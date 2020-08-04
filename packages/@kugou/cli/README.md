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

执行generate命令可以创建入口，CLI会根据项目下templates/page的文件创建新入口相关的代码文件，实现多页面应用

```bash
kugou generate [name]
```

```
选项：
  -h, --help  显示帮助信息                                                [布尔]
  --force     存在同名文件时，是否直接覆盖                [布尔] [默认值: false]
```

执行成功后，会自动往`public/app.json`添加页面配置，并创建以下文件：
- `src/entries/{name}.js`
- `src/pages/{name}.js`
- `public/{name}.html`

注：官方模板会自动根据`src/entries`下的文件生成webpack入口配置

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
