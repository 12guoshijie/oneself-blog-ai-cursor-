# oneself.dev 个人博客

Vue 3 + TypeScript + Element Plus 的静态博客，支持本地 Markdown 文章、标签/归档/搜索，并接入豆包大模型（聊天助手、AI 实验室写作助手）。

## 本地开发

```bash
npm install
npm run dev
```

## 构建

```bash
npm run build
```

产物在 `dist/` 目录。

## 部署到 Vercel

1. 将项目推送到 GitHub（或 GitLab / Bitbucket）：

   ```bash
   git init
   git add .
   git commit -m "init"
   git remote add origin https://github.com/你的用户名/你的仓库名.git
   git push -u origin main
   ```

2. 打开 [vercel.com](https://vercel.com)，登录后点击 **Add New Project**，导入上述仓库。

3. 保持默认即可（Vercel 会识别 Vite）：
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

4. 点击 **Deploy**，等待完成后会得到 `https://xxx.vercel.app` 的访问地址。

5. 若已绑定自定义域名，在项目 **Settings → Domains** 中添加即可。

---

项目已包含 `vercel.json`，所有路由会回退到 `index.html`，刷新或直接打开 `/posts`、`/tags` 等子路径不会 404。
