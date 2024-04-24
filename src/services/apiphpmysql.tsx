import axios from "axios";

const apiphpmysql = axios.create({
  baseURL: "http://api.gruposolar.com.br:8085/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiphpmysql;
