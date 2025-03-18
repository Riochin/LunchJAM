from fastapi import FastAPI

from app.config.firebase_init import firebase_admin
from app.routers.user_routes import router as user_router  # ルーターとしてインポート
from app.routers import qr  # QRコードルーターをインポート
from app.routers import visits # 追加

app = FastAPI()

# ルーターを追加（認証APIなど）
app.include_router(user_router, prefix="/users")
app.include_router(qr.router)  # 追加
app.include_router(visits.router)  # 追加

# テスト用エンドポイント
@app.get("/")
def read_root():
    return {"message": "Hello, FastAPI is running!"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
