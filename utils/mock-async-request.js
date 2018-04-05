function mockAsyncRequest(data) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      resolve(data)
    }, 500)
  });
}

export default mockAsyncRequest
