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

const formatCPUUnits = (microseconds) => {
  if (microseconds >= 86400000000) {
    microseconds = (microseconds / 86400000000).toFixed(2) + ' d';
  } else if (microseconds >= 3600000000) {
    microseconds = (microseconds / 3600000000).toFixed(2) + ' hour';
  } else if (microseconds >= 60000000) {
    microseconds = (microseconds / 60000000).toFixed(2) + ' min';
  } else if (microseconds >= 1000000) {
    microseconds = (microseconds / 1000000).toFixed(2) + ' sec';
  } else if (microseconds >= 1000) {
    microseconds = (microseconds / 1000).toFixed(2) + ' ms';
  } else if (microseconds > 1) {
    microseconds += ' μs';
  } else if (microseconds == 1) {
    microseconds += ' μs';
  } else {
    microseconds = '0 μs';
  }
  return microseconds;
};

export {formatBandUnits, formatCPUUnits};
