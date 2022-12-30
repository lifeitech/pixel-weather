
const months = ['Jan','Feb','Mar.','Apr.','May', 'June', 'July', 'Aug.', 'Sept.', 'Oct.', 'Nov.', 'Dec.'];
const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];

export function parsedate(dt, offset){
    const date = new Date(dt * 1000);
    const local_timezone_offset = date.getTimezoneOffset() * 60;
    const date_local = new Date((dt + offset + local_timezone_offset) * 1000);
    const month = date_local.getMonth() + 1;
    const day = date_local.getDate();
    const week = days[date_local.getDay()];
    const weekend = date_local.getDay() == 0 || date_local.getDay() == 6  // boolean
    const str = month + '/' + day;
    return [str, week, weekend]
  }


export function parsehour(dt, offset){
  const date = new Date(dt * 1000);
  const local_timezone_offset = date.getTimezoneOffset() * 60;
  const date_local = new Date((dt + offset + local_timezone_offset) * 1000);
  const hour = date_local.getHours();
  return hour
}


export function displayLocalTime(dt, offset) {
  if (offset == null){
    return {date:'', time:'0:00'}
  }
  const date = new Date(dt * 1000);
  const local_timezone_offset = date.getTimezoneOffset() * 60;
  const date_local = new Date((dt + offset + local_timezone_offset) * 1000);
  const month = months[date_local.getMonth()];
  const day = date_local.getDate();
  const hour = date_local.getHours();
  let min = date_local.getMinutes();
  min = Number(min) < 10 ? '0'+min : min;
  return {date: month + ' ' + day + ' ', time: hour + ':' + min}
}