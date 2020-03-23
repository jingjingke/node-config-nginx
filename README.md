# node-config-nginx
## 简述
项目目的是在Vue搭建前端页面中，通过生成Nginx配置文件，结合Node实现Nginx的配置。附带配置Hosts，以及本地化端口配置功能。

目前正在开发当中...

## 开发
开发阶阶段，通过下列步骤实现启动页面及服务。
- 安装依赖
```
npm install
```

- 启动Vue页面
```
npm run page
```
- 启动服务
```
npm run node
```

启动服务后，会自助帮我们打开Vue页面。

## 目录说明
开发时主要使用的目录如下（开发过程中可能会有变动，以实际目录为准）

```pre              
├── node                    // Node 服务构建目录
│   ├── server              // Node Http服务（启动与接口定义等）
│   ├── template            // Nginx 配置通用模板、片段
│   ├── util.js             // 公共工具文件
│   └── index.js            // Node 主入口
│
├── src                     // Vue 页面源码
│   ├── config              // 页面渲染时参数配置项目
│   ├── components          // Vue 组件
│   ├── pages               // Vue 组件【页面】
│   ├── App.vue             // Vue 组件【根页面】
│   └── main.js             // Vue 项目入口
```