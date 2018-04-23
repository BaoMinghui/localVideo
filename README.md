## 一款基于koa，mongodb的本地视频服务器
作为学习koa的练习作品
#### 使用方法
1. 打开mongodb数据库

2. 在config.js中修改数据库地址，服务器地址以及视频文件夹

3. node fs-read
>用于读取视频文件夹下的视频路径并存入数据库

3. node app
启动服务器

默认localhost:8080访问

[前端部分地址](https://github.com/BaoMinghui/localVideo-interface)
>暂时还比较丑，会尝试用ui框架包装一下

#### 挖个坑
##### 计划中的功能
未来打算将它发展成本地视频管理应用
1. 局域网内视频播放
2. 前端界面中的视频封面
3. 视频删除
4. 视频评级，添加tag
5. 支持tag搜索
6. 简化操作
7. 用Electron迁移到桌面应用
