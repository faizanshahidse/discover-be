function isJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

function isValidTimeZone(tz) {
    if (!Intl || !Intl.DateTimeFormat().resolvedOptions().timeZone) {
        throw new Error('Time zones are not available in this environment');
    }
    
    try {
      Intl.DateTimeFormat(undefined, { timeZone: tz });
      return true;
    } catch (e) {
      return false;
    }
  }

module.exports = {
    isJsonString,
    isValidTimeZone
}