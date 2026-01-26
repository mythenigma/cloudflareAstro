---
title: "Maiimg：画像をリンクとQRでかんたん共有"
description: "画像共有の基本フロー：画像を選ぶ → アップロード → リンク/QR を取得 → 共有 → 必要なら閲覧状況を確認。"
pubDate: "Jan 26 2026"
tags: ["画像共有", "QRコード", "Maiimg"]
---

チャットに画像を何枚も貼るより、**リンクでまとめて共有**したほうがスムーズな場面があります。

Maiimg は **画像共有**向けのサービスです（PDF は MaiPDF）。

## 基本フロー

1. 画像を選択
2. アップロード
3. リンク / QR を取得
4. 共有
5. 必要に応じて確認・管理

```mermaid
flowchart TD
  A[Select images] --> B[Upload]
  B --> C[Get link and QR]
  C --> D[Share]
  D --> E[Check views and manage]
```

## 画面イメージ

![Upload](/maiimg/maiimg-head.png)

![Settings](/maiimg/maiimg-setting.png)

![Link result](/maiimg/image_result.png)

![Tracking](/maiimg/result_tracking.png)

