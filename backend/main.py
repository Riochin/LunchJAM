from fastapi import FastAPI

from fastapi.middleware.cors import CORSMiddleware  # CORSの設定用にインポート
from app.routers.user_routes import router as user_router  # ルーターとしてインポート
from app.routers import visits , cafeteria_status, qr
from fastapi.staticfiles import StaticFiles
from app.config.firebase_init import firebase_admin


app = FastAPI()

# from fastapi_utils.tasks import repeat_every

# @app.on_event("startup")
# @repeat_every(seconds=60)  # 1分ごとに更新
# async def update_cafeteria_status():
#     db = next(get_db())
#     try:
#         update_cafeteria_status_from_visits(db)
#     finally:
#         db.close()

# staticフォルダをマウントして、静的ファイルを提供
app.mount("/static", StaticFiles(directory="static"), name="static")

# CORSの設定
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # フロントエンドのURLを指定
    allow_credentials=True,
    allow_methods=["*"],  # 必要に応じて特定のメソッドを許可
    allow_headers=["*"],  # 必要に応じて特定のヘッダーを許可
)

# ルーターを追加（認証APIなど）
app.include_router(user_router, prefix="/users")
app.include_router(qr.router)
app.include_router(visits.router)
app.include_router(cafeteria_status.router)  # 追加

# テスト用エンドポイント
@app.get("/")
def read_root():
    return {"message": "Hello, FastAPI is running!"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
