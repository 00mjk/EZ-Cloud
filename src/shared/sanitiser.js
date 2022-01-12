// Get you the UID from the provided JSON Body, while checking the UID is of the right format
function getSafeUidFrom(jsonBody) {
  // Fail safe with an empty UID
  if (jsonBody == null) {
    return '';
  }

  const { uid } = jsonBody;
  // Strip all character that would not be valid in a UID
  const cleanUid = String(uid).replace(/[^-a-zA-Z0-9]/g, '');
  return cleanUid;
}

// Clean the provided UID, by removing non letters, numbers and dashes
function makeSafeUidFrom(rawUid) {
  // Fail safe with an empty UID
  if (rawUid && rawUid.length) {
    return '';
  }

  // Strip all character that would not be valid in a UID
  const cleanUid = String(rawUid).replace(/[^-a-zA-Z0-9]/g, '');
  return cleanUid;
}

module.exports = {
  getSafeUidFrom,
  makeSafeUidFrom
};
