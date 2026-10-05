# CFNext 部署说明

本仓库是 [PAICNI/CFNext](https://github.com/PAICNI/CFNext) 的部署工程化 fork，用于把单文件 Cloudflare Worker 代理订阅管理面板部署到 Cloudflare，并区分**测试 / 生产**两套环境。

## 目录结构

```
src/worker.js              # 从「CFNext 明文版.js」复制的 Worker 入口
wrangler.toml             # 生产环境配置（GitHub Action 自动部署使用）
wrangler.test.toml        # 测试环境配置（本地手动上传部署包使用）
.github/workflows/deploy.yml  # 生产环境 GitHub Action 自动部署
```

## 环境对照

| 项目 | 测试环境 | 生产环境 |
|---|---|---|
| 用途 | 编码测试 | 稳定对外 |
| 部署方式 | 本地手动上传部署包 | GitHub Action 自动部署 |
| Cloudflare 账户 | 0d7cb24f17aa38cbf375e5863b0797c7 | b1380abef4376652a1abd2b6138a554e |
| Worker 名称 | cfnext-test | cfnext |
| 子域名 | cfnext.zhangsen.kdns.fr | cfnext.520215.xyz |
| KV 命名空间 | cfnext-test-kv | cfnext-prod-kv |

## 测试环境（手动上传部署包）

仅用于编码测试。在本地执行以下命令即可把 Worker 代码包上传到 Cloudflare 测试账户：

```bash
CLOUDFLARE_API_TOKEN=<测试账户 API 令牌> \
CLOUDFLARE_ACCOUNT_ID=0d7cb24f17aa38cbf375e5863b0797c7 \
npx wrangler deploy --config wrangler.test.toml
```

部署后访问 `https://cfnext.zhangsen.kdns.fr/<U>` 进入面板，订阅地址 `https://cfnext.zhangsen.kdns.fr/<U>/sub`。

## 生产环境（GitHub Action 自动部署）

推送代码到 `main` 分支（或手动触发 workflow）即自动部署到生产账户。仓库需配置以下 Secrets：

- `CLOUDFLARE_API_TOKEN`：生产账户 API 令牌
- `CLOUDFLARE_ACCOUNT_ID`：生产账户 ID `b1380abef4376652a1abd2b6138a554e`

部署后访问 `https://cfnext.520215.xyz/<U>` 进入面板。

> 流程约定：**测试环境验证无误后，再将最终代码推到 main 触发生产自动部署**。
