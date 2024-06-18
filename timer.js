document.addEventListener('DOMContentLoaded', function () {
    const startBtn = document.getElementById('startBtn');
    const timerDisplay = document.getElementById('timerDisplay');
    const notificationDiv = document.getElementById('notification');
    let intervalId;

    startBtn.addEventListener('click', startTimer);

    function startTimer() {
        const durationInput = document.getElementById('duration');
        const duration = parseInt(durationInput.value, 10);
        let remainingTime = duration;

        notificationDiv.innerHTML = '';

        intervalId = setInterval(() => {
            remainingTime--;
            if (remainingTime >= 0) {
                timerDisplay.textContent = formatTime(remainingTime);
            } else {
                clearInterval(intervalId);
                timerDisplay.textContent = 'Timer Expired';
                displayNotification();
            }
        }, 1000);
    }

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    }

    function displayNotification() {
        notificationDiv.textContent = 'Timer Expired!';

        setTimeout(() => {
            notificationDiv.textContent += ' - 5 seconds delayed notification';
        }, 5000);

        const repeatInterval = setInterval(() => {
            notificationDiv.textContent += ' - Repeating notification every 10 seconds';
        }, 10000);

        setTimeout(() => {
            clearInterval(repeatInterval);
            notificationDiv.textContent += ' - Notification dismissed';
        }, 30000);
    }
});
