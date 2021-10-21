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
  --description, --desc, -d  离线包简介，10-32个字符                      [必需]
  --root, -r  子包目录                                                  [字符串]
```

备注：

- 发布前需要在```public/app.json```中填写appid和appkey参数

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
