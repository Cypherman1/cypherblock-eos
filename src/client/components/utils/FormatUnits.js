const formatBandUnits = (bytes) => {
  if (bytes >= 1099511627776) {
    bytes = (bytes / 1099511627776).toFixed(2) + ' GB';
  } else if (bytes >= 1073741824) {
    bytes = (bytes / 1073741824).toFixed(2) + ' GB';
  } else if (bytes >= 1048576) {
    bytes = (bytes / 1048576).toFixed(2) + ' MB';
  } else if (bytes >= 1024) {
    bytes = (bytes / 1024).toFixed(2) + ' KB';
  } else if (bytes > 1) {
    bytes += ' bytes';
  } else if (bytes == 1) {
    bytes += ' byte';
  } else {
    bytes = '0 byte';
  }
  return bytes;
};
//Time unit formating
const formatCPUUnits = (seconds) => {
  if (seconds >= 86400000) {
    seconds = (seconds / 86400000).toFixed(2) + ' d';
  } else if (seconds >= 3600000) {
    seconds = (seconds / 3600000).toFixed(2) + ' hour';
  } else if (seconds >= 60000) {
    seconds = (seconds / 60000).toFixed(2) + ' min';
  } else if (seconds >= 1000) {
    seconds = (seconds / 1000).toFixed(2) + ' sec';
  } else if (seconds > 1) {
    seconds += ' ms';
  } else if (seconds == 1) {
    seconds += ' ms';
  } else {
    seconds = '0 ms';
  }
  return seconds;
};

export {formatBandUnits, formatCPUUnits};
