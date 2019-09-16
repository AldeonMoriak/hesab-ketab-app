function URLGenerator(updatedState) {
  let updatedStateArr = [];
  let url = "?";
  // eslint-disable-next-line
  for (let element in updatedState) {
    updatedStateArr.push(element);
  }
  // eslint-disable-next-line
  for (let element in updatedState) {
    url = url.concat(`${element}=${updatedState[element]}`);
    if (updatedStateArr.length - 1 !== updatedStateArr.indexOf(element)) {
      url = url.concat("&");
    }
    return url;
    console.log(updatedState);
  }
}

export default URLGenerator;
