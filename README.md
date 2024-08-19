# 幼児向けスケジュールリマインダ
時計に興味を持ち始めた幼児向けのスケジュールリマインダです。

csvで定義したスケジュールを幼児が理解しやすい形式で視覚化します。

具体的には、直近の予定とその開始時刻を表すアナログ時計画像を表示します。

<img width="500" alt="image" src="https://github.com/user-attachments/assets/c19fb8eb-0fd8-406e-a40b-8e4eeb5aac25">

# セットアップ手順

python 3.12.5で動作検証しています。

```
cp -r sampledata data
cp .env_sample .env
pip install -r requirements.txt
python app.py
```

標準出力に表示されたアドレスにブラウザからアクセスし、アプリ画面が表示されれば成功です。

# スケジュールの編集
`data/reminders.csv`を編集してください。

時、分、テキスト、画像を設定可能です。

画像ファイルは`data/images/`においてください。

# デバッグモード
デバッグモードを有効にするには、URLのクエリパラメータに`debug=true`を追加します。
