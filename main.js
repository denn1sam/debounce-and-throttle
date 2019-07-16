const input = document.getElementById('search');
const timerBlock = document.getElementById('timer');
const ul = document.getElementsByClassName('list')[0];
const listElements = ul.getElementsByTagName('li');

function debounce(func, wait) {
  return function (args) {
    let previousCall = this.lastCall;
    this.lastCall = Date.now();
    if (previousCall && ((this.lastCall - previousCall) <= wait)) {
      clearTimeout(this.lastCallTimer);
    }
    this.lastCallTimer = setTimeout(() => func(args), wait);
  }
};

function onChangeInput() {
  const filter = input.value.toUpperCase();

  for (let li of listElements) {
    txtValue = li.textContent || li.innerText;
    li.style.display = txtValue.toUpperCase().indexOf(filter) > -1 ? '' : 'none';
  }
}

const debouncedFunc = debounce(onChangeInput, 1000);
input.addEventListener('input', debouncedFunc);

function throttle(func, wait) {
  return function (args) {
    let previousCall = this.lastCall;
    this.lastCall = Date.now();
    if (previousCall === undefined || (this.lastCall - previousCall) > wait) {
      func(args);
    }
  }
}

const throttledFunc = throttle(() => {
  event.target.style.backgroundColor = getRandomColor();
  timeToEnd(2000);
}, 2000);

ul.addEventListener('click', throttledFunc);

function getRandomColor() {
  return `#${(Math.random() * 0xFFFFFF << 0).toString(16)}`;
}
function timeToEnd(time) {
  const endTime = new Date().getTime() + time;
  const interval = setInterval(() => {
    const now = new Date().getTime();
    const distance = endTime - now;
    const miliseconds = distance;

    timerBlock.innerHTML = `${miliseconds}ms`;

    if (distance < 0) {
      clearInterval(interval);
      timerBlock.innerHTML = "EXPIRED";
    }
  }, 1);
}