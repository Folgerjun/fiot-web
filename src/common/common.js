export default {
  saveLocal: function (key, value) {
    localStorage.setItem(key, value);
  },
  getLocal: function (key) {
    return localStorage.getItem(key);
  },
  clearLocal: function (key) {
    localStorage.removeItem(key);
  }
};
