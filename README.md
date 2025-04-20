<div align="center">
  <img src="./logo.png" alt="logo" style="width: 100px; /* 可根据需要调整图标宽度 */">
  <h3>pingpongUp - 基于百度飞桨/千帆大模型的乒乓球运动助手</h3>
</div>

## 项目概述
`pingpongUp` 是一个基于飞桨大模型开发的乒乓球运动助手，旨在为乒乓球爱好者提供全方位的运动辅助服务。该项目结合了 AI 对话、图像和视频处理等功能，通过前端和后端的协作，为用户打造一个智能、便捷的运动体验平台。


### 各部分说明
- **`backend` 文件夹**：项目的后端代码，使用 Flask 框架搭建。包含用户认证、AI 对话、图像和视频处理等功能的实现。
  - `pingpong.py`：后端主程序，实现了用户注册、登录、AI 对话、图像和视频处理等路由。
  - `pingpong.sql`：数据库脚本文件，用于创建和管理项目所需的数据库。
  - `templates/`：存放 HTML 模板文件，用于渲染页面。
- **`frontend` 文件夹**：项目的前端代码，使用 React 和 TypeScript 开发，结合 Vite 构建工具。
  - `pingpongUp-frontend/`：前端项目的主要代码，包含页面组件、样式文件和路由配置等。
- **`model` 文件夹**：存放模型相关的配置文件和模型文件。
  - `configs/`：模型配置文件。
  - `models/`：训练好的模型文件。
- **`static` 文件夹**：静态资源文件夹，用于存放上传的图片和视频，以及处理后的结果。
  - `processed/`：存放处理后的图片和视频。
  - `uploads/`：存放用户上传的原始图片和视频。
- **`todo.md`**：记录项目待完成的任务和功能。

## 技术栈
### 前端
- **React**：用于构建用户界面的 JavaScript 库。
- **TypeScript**：JavaScript 的超集，提供静态类型检查。
- **Vite**：快速的前端构建工具。
- **Tailwind CSS**：用于快速构建用户界面的 CSS 框架。

### 后端
- **Flask**：轻量级的 Python Web 框架。
- **MySQL**：关系型数据库，用于存储用户信息和项目数据。
- **PaddleDetection**：飞桨的目标检测框架，用于图像和视频处理。
- **百度文心一言**：用于实现 AI 对话功能。

## 快速开始
### 前端
1. 进入 `frontend/pingpongUp-frontend` 目录：
```bash
cd frontend/pingpongUp-frontend
```
2. 安装依赖：
```bash
npm install
```

3. 启动开发服务器：
```bash
npm run dev
```
### 后端
1. 进入 `backend` 目录：
```bash
cd backend
```
2. 安装依赖：
```bash
pip install -r requirements.txt
```
3. 启动后端服务：
```bash
python pingpong.py
```

## 功能特性
- 用户认证 ：支持用户注册、登录和登出功能。
- AI 对话 ：基于百度文心一言大模型，为用户提供乒乓球相关问题的解答。
- 图像处理 ：使用飞桨目标检测框架对上传的图片进行处理，检测乒乓球运动员的关键点。
- 视频处理 ：对上传的视频进行分帧处理，对每一帧进行目标检测和关键点检测，最后合成处理后的视频。
## 待办事项
查看 todo.md 文件，了解项目待完成的任务和功能。

## 贡献
如果你想为 pingpongUp 项目做出贡献，请提交 Pull Request 或创建 Issue。

## 许可证
本项目采用 MIT 许可证 。





















