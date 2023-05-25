export function getCurrentDateTime() {
  var now = new Date();
  var year = now.getFullYear();
  var month = padZero(now.getMonth() + 1);
  var day = padZero(now.getDate());
  var hours = padZero(now.getHours());
  var minutes = padZero(now.getMinutes());
  var seconds = padZero(now.getSeconds());

  return year + month + day + hours + minutes + seconds;
}

function padZero(number) {
  return number.toString().padStart(2, '0');
}
