function delay(t, v) {
  return new Promise(function (resolve) {
    setTimeout(resolve.bind(null, v), t);
  });
}

export function keepTrying(triesRemaining, storageRef) {
  if (triesRemaining < 0) {
    return Promise.reject("out of tries");
  }

  return storageRef
    .getDownloadURL()
    .then((url) => {
      return url;
    })
    .catch((error) => {
      switch (error.code) {
        case "storage/object-not-found":
          return delay(2000)
            .then(() => {
              return keepTrying(triesRemaining - 1, storageRef);
            })
            .catch((err) => console.log("Error caught ", err.message));
        default:
          console.log(error);
          return Promise.reject(error);
      }
    });
}
