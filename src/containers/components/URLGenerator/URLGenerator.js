export default function URLGenerator(updatedState) {
  let updatedStateArr = [];
  let url = "?";
  for (let element in updatedState) {
    updatedStateArr.push(element);
  }

  for (let element in updatedState) {
    console.log(updatedState[element]);
    url = url.concat(`${element}=${updatedState[element]}`);
    if (updatedStateArr.length - 1 !== updatedStateArr.indexOf(element)) {
      url = url.concat("&");
    }
  }
  return url;
}
