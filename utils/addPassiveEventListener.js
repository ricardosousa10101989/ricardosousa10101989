let passiveSupported = false;

try {
  const options = {
    get passive() {
      passiveSupported = true;
      return false;
    },
  };

  window.addEventListener('test', null, options);
  window.removeEventListener('test', null, options);
}
catch (ex) { /* no-op */ }

export default (obj, type, handler) => {
  const options = passiveSupported ? { passive: true } : false;

  obj.addEventListener(type, handler, options);

  return () => {
    obj.removeEventListener(type, handler, options);
  };
};
