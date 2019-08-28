import axios from "axios";

const instance = axios.create({
  baseURL: "https://aldeon-react-burger.firebaseio.com/"
});

export default instance;
