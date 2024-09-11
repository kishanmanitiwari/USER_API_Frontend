import { useState } from "react";
import axios from "axios";

const useApi = (API_URL) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const makeRequest = async (
    method,
    endpoint = "",
    payload = {},
    headers = {}
  ) => {
    setLoading(true);
    setError("");
    try {
      const config = { headers };
      let response;

      switch (method.toLowerCase()) {
        case "get":
          response = await axios.get(`${API_URL}/${endpoint}`, config);
          break;
        case "post":
          response = await axios.post(
            `${API_URL}/${endpoint}`,
            payload,
            config
          );
          break;
        case "put":
          response = await axios.put(`${API_URL}/${endpoint}`, payload, config);
          break;
        case "patch":
          response = await axios.patch(
            `${API_URL}/${endpoint}`,
            payload,
            config
          );
          break;
        case "delete":
          response = await axios.delete(`${API_URL}/${endpoint}`, config);
          break;
        default:
          throw new Error("Invalid HTTP method");
      }

      setData(response.data);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return { loading, data, error, makeRequest };
};

export default useApi;
