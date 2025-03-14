# LunchJAM
# 食堂混雑可視化アプリ 🍽️

## 🎯 プロジェクト概要
学生食堂の混雑状況をリアルタイムで可視化し、QRコードで入退室を管理するWebアプリ。

## 🛠 技術スタック
- フロントエンド: **React + TypeScript**
- バックエンド: **FastAPI + PostgreSQL**
- 認証: JWT
- データベース: PostgreSQL（開発はDocker / 共有はRailway）
- QRコード: jsQR / pyqrcode

## 🚀 セットアップ
### 1. リポジトリをクローン
```sh
git clone git@github.com:Riochin/LunchJAM.git
cd LunchJAM
```

## アプリの立ち上げ
### フロントエンド
```sh
cd frontend
npm install
npm run dev
```
→ http://localhost:3000 で起動！

### バックエンド
👇初回のみ
```sh
cd backend
python -m venv venv
```
```sh
source venv/bin/activate  # Windowsなら venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```
→ http://127.0.0.1:8000/docs にアクセスしてAPI確認！
