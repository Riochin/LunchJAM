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

### 2. バックエンドで仮想環境を構築
```sh
cd backend
python -m venv venv
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
```sh
source venv/bin/activate  # Windowsなら venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```
→ http://127.0.0.1:8000/docs にアクセスしてAPI確認！

## 📝コミットメッセージ（守らなくてもいい！！）
この記事を参照👇
https://qiita.com/itosho/items/9565c6ad2ffc24c09364

## 🏠branch命名規則（守らなくてもいい！！）
https://qiita.com/Hashimoto-Noriaki/items/5d990e21351b331d2aa1

👆の記事を参照に、たとえば...

> feature/Riochin/add-login-function

といった感じにしたい！（守らなくてもいい！！）
