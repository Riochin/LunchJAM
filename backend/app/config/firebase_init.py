import firebase_admin
from firebase_admin import credentials
import os

# 現在のファイルのディレクトリを取得
current_dir = os.path.dirname(os.path.abspath(__file__))

# Firebaseの秘密鍵を指定（正しい相対パスを設定）
firebase_credentials_path = os.path.join(current_dir, "lunchjam-99a15-firebase-adminsdk-fbsvc-4e1d64e6f4.json")

# Firebaseの秘密鍵を指定（パスを正しく設定）
cred = credentials.Certificate(firebase_credentials_path)

# Firebaseの初期化（すでに初期化されていたらスキップ）
try:
    firebase_admin.get_app()
except ValueError:
    firebase_admin.initialize_app(cred)
