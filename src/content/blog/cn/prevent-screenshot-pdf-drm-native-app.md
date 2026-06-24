---
title: "PDF 防止截屏：MaiPDF Secure 桌面 App 完整指南"
description: "Windows/macOS 打包 .maipdf，系统级防截图、防录屏。分步说明、授权规则、大陆下载。与 pack.html 网页打包不是一回事。"
pubDate: "Jun 23 2026"
updatedDate: "Jun 23 2026"
heroImage: "/maipdf2026/offline/offlinedrm.png"
tags: ["防止截屏", "防截图", "PDF DRM", ".maipdf", "原生App"]
showDefaultCta: false
---

**一句话：** 浏览器里的 PDF（[maipdf.cn](https://maipdf.cn) 链接或 [pack.html](https://drm.maipdf.com/pack.html) 网页 HTML 包）**不能**真正防止截屏。要 **PDF 防止截屏**，用 **MaiPDF Secure 桌面 App** 打包 `.maipdf`，对方只在 App 内打开。

网页打包链路：**PDF → 加密 → webpack 打成 HTML → ZIP**，浏览器阅读，安全等级较低。`.maipdf` 是 **原生 App 打包 + 原生阅读器**，才能调用系统级防截图能力。共用 license 后台，**不是同一种产品**。

---

## 三种方式对比

| 方式 | 防止截屏？ |
|---|---|
| maipdf.cn 在线链接 | ❌ 水印、访问控制 |
| pack.html 网页 HTML 包 | ❌ 仍在浏览器沙箱 |
| **桌面 App + `.maipdf`** | ✅ 系统级（Android 手机端通常最强） |

---

## 下载安装（桌面）

1. 打开 [drm.maipdf.com](https://drm.maipdf.com/)
2. 下载 **Windows** 或 **macOS** 安装包
3. 安装后用 **Google 账号** 登录（打包和阅读都要登录）

![桌面端安装与入口](/maipdf2026/offline/inststruct.png)

配图为 **桌面版 UI**。手机版规则相同，防截屏强度因系统而异；本仓库暂无手机界面截图。

| 平台 | 获取方式 |
|---|---|
| Windows / macOS | 官网直链 |
| Android | Google Play 或 APK |
| iPhone | App Store |

### 中国大陆

华为 / 小米 / 应用宝等 **不是首批上架**。须先完成软著等合规，再正式走商店审核。

**现阶段：** 境外 Apple ID、Google Play，或官网下载桌面版 / APK。

---

## 打包步骤

### 1. 准备 PDF

用定稿版本打包，打包后不能改内容，只能重新打新包再发。

### 2. 在 App 内选择「保护 PDF / 打包」

![桌面端 DRM 入口](/maipdf2026/offline/offlinedrm.png)

### 3. 设置授权规则

| 规则 | 作用 |
|---|---|
| 过期时间 | 到期后无法打开 |
| 打开次数 | 每次点「解锁」消耗一次 |
| 允许邮箱 | 可选，仅列出的 Google 账号可读 |
| 设备上限 | 每个账号可绑定的设备数 |

### 4. 导出 `.maipdf`

像普通附件一样发出：邮件、网盘、U 盘均可。

### 5. 告诉收件人

1. 安装 MaiPDF Secure  
2. 用**被允许的 Google 账号**登录  
3. **只在 App 内**打开 `.maipdf`，不要用 Adobe / 预览 / 浏览器  

### 6. 事后管理

在 App 许可证列表或 [控制台](https://drm.maipdf.com/dashboard)：

- 增加打开次数  
- 延长过期  
- 撤销（所有副本下次打开失败）  

---

## 各平台防截屏表现（概览）

| 平台 | 通常表现 |
|---|---|
| Android | 较强，系统级保护 |
| Windows / macOS | 原生查看器拦截常见截屏路径 |
| iOS | 偏检测 + 水印，硬拦截弱于 Android |

发之前用**和对方相同的系统**试开一遍。

---

## 网页打包什么时候够用？

对方**坚决不装 App**、且截屏不是硬性要求 → [pack.html 完整教程](/blog/en/how-to-create-offline-pdf-package-complete-guide)（英文，含截图）

合同、付费课件、未公开设计稿等需要 **防止截屏** → 必须用本 App 的 `.maipdf`。

---

## 仍做不到的事

- 另一台手机对着屏幕拍照  
- 完全断网环境打开（解锁时要联网验 license）  
- 打包后改 PDF 内容（须重新打包）  

---

## 常见问题

**免费吗？** 是，个人和公司均可，无需企业采购价。

**和 pack.html 区别？** 网页 = 不装 App、浏览器限制；要 **防止截屏** 用桌面 App。

**和 LockLizard？** → [对比文](/blog/cn/maipdf-secure-vs-locklizard-pdf-drm)

<div class="cta-container">
  <a href="https://drm.maipdf.com/" target="_blank" rel="noopener noreferrer" class="cta-button">
    下载 MaiPDF Secure
  </a>
</div>
