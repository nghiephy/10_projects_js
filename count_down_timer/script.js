const daysElement = document.querySelector("#days");
const hoursElement = document.querySelector("#hours");
const minutesElement = document.querySelector("#minutes");
const secondsElement = document.querySelector("#seconds");
const destDateStr = "1 Jan 2022";

function countDown() {
    const destDate = new Date(destDateStr);
    const currentDate = new Date();

    const totalSeconds = (destDate - currentDate) / 1000;
    const days = Math.floor(totalSeconds/3600/24);
    const hours = Math.floor(totalSeconds/3600) % 24;
    const minutes = Math.floor(totalSeconds/60) % 60;
    const seconds = Math.floor(totalSeconds % 60);

    daysElement.innerHTML = formatTime(days);
    hoursElement.innerHTML = formatTime(hours);
    minutesElement.innerHTML = formatTime(minutes);
    secondsElement.innerHTML = formatTime(seconds);

}

function formatTime(time) {
    return (time<10)? `0${time}` : time;
}

setInterval(countDown, 1000);
