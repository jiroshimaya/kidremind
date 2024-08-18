# セットアップ手順

```
cp -r sampledata data
cp .env_sample .env
pip install -r requirements.txt
python app.py
```

# デバッグモード
デバッグモードを有効にするには、URLのクエリパラメータに`debug=true`を追加します。
