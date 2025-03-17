# Python の公式イメージを使う
FROM python:3.11

# 作業ディレクトリを設定
WORKDIR /

# 必要なファイルをコピー
COPY requirements.txt .

# 依存パッケージをインストール
RUN pip install --no-cache-dir -r requirements.txt

# Alembicをインストール
RUN pip install alembic

# アプリのコードをコピー
COPY . .

# 環境変数を設定
ENV DATABASE_URL=db

# FastAPI を起動（リロード付き）
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
