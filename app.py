from flask import Flask, render_template, jsonify, send_from_directory, request
import csv
from datetime import datetime
import os
import dotenv
dotenv.load_dotenv()

app = Flask(__name__)

# CSVファイルのパスと画像ディレクトリを環境変数から取得
CSV_FILE_PATH = os.environ.get('REMINDERS_CSV_PATH', 'data/reminders.csv')
IMAGES_DIR = os.environ.get('IMAGES_DIR', 'data/images')
# アクセス可能なIPアドレスを環境変数から取得
ALLOWED_IPS = os.environ.get('ALLOWED_IPS', '').split(',')

def check_ip():
    if not ALLOWED_IPS or ALLOWED_IPS == ['']:  # 環境変数が設定されていないか空の場合
        return None  # すべてのIPからのアクセスを許可
    client_ip = request.remote_addr
    if client_ip not in ALLOWED_IPS:
        return jsonify({'error': 'Access denied'}), 403

@app.before_request
def before_request():
    result = check_ip()
    if result:
        return result

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/reminders')
def get_reminders():
    reminders = []
    try:
        with open(CSV_FILE_PATH, 'r') as csv_file:
            csv_reader = csv.DictReader(csv_file)
            for row in csv_reader:
                reminder = {
                    'hour': int(row['hour']),
                    'minute': int(row['minute']),
                    'text': row['text'],
                    'imagePath': f"/images/{row['imagePath']}"
                }
                reminders.append(reminder)
        
        # 時刻でソート
        reminders.sort(key=lambda x: (x['hour'], x['minute']))
        
        return jsonify(reminders)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/images/<path:filename>')
def serve_image(filename):
    return send_from_directory(IMAGES_DIR, filename)

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    debug = os.environ.get('FLASK_DEBUG', 'True').lower() == 'true'
    app.run(debug=debug, host="0.0.0.0", port=port)