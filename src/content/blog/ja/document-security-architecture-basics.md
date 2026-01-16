---
title: "PDF共有の設定（MaiPDFアップロード画面）"
description: "アップロード画面で見える設定を、わかりやすく説明します。"
pubDate: "Jan 15 2026"
tags: ["文書セキュリティ", "セキュリティ設計", "暗号化", "アクセス制御"]
---

# PDF共有の設定

<div class="intro-panel">
  <p>ここでは<strong>アップロード画面の設定項目</strong>だけをわかりやすく説明します。</p>
</div>

![PDF共有の設定](/diagram/ja/pdf-sharing-settings.svg)

## 5つの設定項目

1. **アクセス制限**  
   総開封回数を制限します。

2. **セッション時間**  
   1回の閲覧時間を制限します。

3. **保護タイプ**  
   - DynamoWatermark  
   - SecureView（閲覧のみ）  
   - FenceView（スクショ抑止）  
   - Unrestricted  

4. **メール認証**  
   閲覧前にメール確認を求めます。

5. **閲覧通知（任意）**  
   開封時にメールで通知します。

## 簡単フロー

```mermaid
flowchart LR
  A[PDFをアップロード] --> B[設定を選ぶ]
  B --> C[安全リンク作成]
  C --> D[共有して確認]
```

