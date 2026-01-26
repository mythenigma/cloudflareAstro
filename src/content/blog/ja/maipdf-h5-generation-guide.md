---
title: "PDFをオフライン閲覧用H5/HTMLパッケージにする（クイックガイド）"
description: "ネット接続が不安定な環境向けに、PDFをZIP/HTMLパッケージとして配布する基本手順をまとめます。"
pubDate: "Jan 26 2026"
tags: ["PDF", "オフライン", "HTML", "配布"]
---

オンライン共有は便利ですが、現場によっては **オフラインで開ける形式**が必要なことがあります。ここでは ZIP/HTML パッケージの流れだけを短くまとめます。

## 基本フロー

1. オフラインパッケージを生成
2. ZIP をダウンロード
3. ZIP を配布
4. ZIP 内の HTML を開く
5. 内容更新時は新しい ZIP を配布

```mermaid
flowchart TD
  A[Prepare PDF] --> B[Generate offline package]
  B --> C[Download ZIP]
  C --> D[Distribute ZIP]
  D --> E[Open HTML locally]
  E --> F[Update: new ZIP]
```

## 画面イメージ

![Upload offline](/offlinepages/upload_section_offline_maipdf.png)

![Download ZIP](/offlinepages/result_download_zip_file.png)

![Open HTML](/offlinepages/click_html_inside_zip_to_view.png)

![Update example](/offlinepages/success_example_offline_file_change.png)

