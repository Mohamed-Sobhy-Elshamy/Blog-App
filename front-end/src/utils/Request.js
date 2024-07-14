import axios from "axios";

const request = axios.create({
    baseURL: "http://localhost:8000"
});
// هذا ال req من نوع axios =>> فيه baseURL

export default request;