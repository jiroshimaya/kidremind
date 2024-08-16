let reminders = [];

function createClockFace() {
    const clock = document.getElementById('clock');
    const svgNS = "http://www.w3.org/2000/svg";

    for (let i = 1; i <= 12; i++) {
        const angle = (i * 30 - 90) * (Math.PI / 180);
        const x1 = 50 + 40 * Math.cos(angle);
        const y1 = 50 + 40 * Math.sin(angle);
        const x2 = 50 + 45 * Math.cos(angle);
        const y2 = 50 + 45 * Math.sin(angle);
        
        // マーカー
        const line = document.createElementNS(svgNS, 'line');
        line.setAttribute('x1', x1);
        line.setAttribute('y1', y1);
        line.setAttribute('x2', x2);
        line.setAttribute('y2', y2);
        line.setAttribute('stroke', 'black');
        line.setAttribute('stroke-width', '2');
        clock.appendChild(line);
        
        // 数字
        const textX = 50 + 35 * Math.cos(angle);
        const textY = 50 + 35 * Math.sin(angle);
        const text = document.createElementNS(svgNS, 'text');
        text.setAttribute('x', textX);
        text.setAttribute('y', textY);
        text.setAttribute('font-size', '6');
        text.setAttribute('text-anchor', 'middle');
        text.setAttribute('dominant-baseline', 'middle');
        text.textContent = i;
        clock.appendChild(text);
    }
}

function loadNextReminder() {
    fetch('/api/next_reminder')
        .then(response => response.json())
        .then(data => {
            if (data.hour !== undefined) {
                setReminder(data.hour, data.minute, data.text, data.imagePath);
            } else {
                console.log('No reminders found');
            }
        })
        .catch(error => console.error('Error:', error));
}

function setClock(hours, minutes, seconds = 0) {
    // 時計の針の角度を計算
    const secondAngle = (seconds / 60) * 360;
    const minuteAngle = ((minutes + seconds / 60) / 60) * 360;
    const hourAngle = ((hours % 12 + minutes / 60) / 12) * 360;

    // SVGの針を回転
    document.getElementById('minute-hand').setAttribute('transform', `rotate(${minuteAngle}, 50, 50)`);
    document.getElementById('hour-hand').setAttribute('transform', `rotate(${hourAngle}, 50, 50)`);
}

function setReminder(hour, minute, text, imagePath) {
    // リマインダーテキストを更新
    const reminderElement = document.getElementById('reminder');
    const displayHour = hour > 12 ? hour - 12 : hour;
    const amPm = hour >= 12 ? 'PM' : 'AM';
    reminderElement.textContent = `${displayHour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')} ${amPm} - ${text}`;

    // 画像を更新
    const imageElement = document.getElementById('image');
    imageElement.src = imagePath;  // サーバーから受け取ったパスをそのまま使用
    imageElement.alt = text;

    // リマインダーの時刻に合わせて時計の針を設定
    setClock(hour, minute, 0);
}

// 時計の文字盤を作成
createClockFace();


// 1分ごとにリマインダーをロード
setInterval(loadNextReminder, 60000);

// 初回のリマインダーロードと時計の更新
loadNextReminder();
