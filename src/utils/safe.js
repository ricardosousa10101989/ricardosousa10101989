// Helper method to run code without breaking the main thread.
export default cb => {
  try {
    cb();
  }
  catch (ex) {
    // eslint-disable-next-line no-console
    console.error(ex);
  }
};
