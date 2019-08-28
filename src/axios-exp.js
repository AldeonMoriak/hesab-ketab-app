import axios from "axios";

const instance = axios.create({
  baseURL: "http://192.168.1.151:75"
});
// instance.defaults.headers.post["Content-Type"] = "application/json";
instance.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
// instance.defaults.headers.post["Vary"] = "Origin";

export default instance;
