export const IsTokenSearched = (tokeninfo, searchterm) => {
  if (searchterm.length == 0) return true;

  if (tokeninfo.name.toUpperCase().includes(searchterm.toUpperCase())) return true;

  return false;
};
