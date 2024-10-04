import axios from "axios";
import { store } from "@/redux";
import { startsWith } from "lodash";
import { clearAuthUser } from "@/redux/user/actions";
import { BASE_URL } from "@/env";

const apiInstance = axios.create({
  timeout: 150000,
});

apiInstance.interceptors.request.use(
  async (config) => {
    return {
      ...config,
      baseURL: BASE_URL,
      headers: { ...config.headers },
    };
  },
  (err) => {
    console.log(err);
    redirectLogin();
  }
);

apiInstance.interceptors.response.use(undefined, (err) => {
  let { config, request, response, message } = err;
  if (message && startsWith(message, "Request failed with status code")) {
    message = "An error occurred. Please try again.";
  }

  if(request){ 
    config.stop = true;
    return axios(config);
  }
  if (!response || !config) {
    return Promise.reject({ ...err, message });
  }
  const { status, data } = response;
  let respMessage = data.message;
  if (respMessage && startsWith(respMessage, "Request failed with status code")) {
    respMessage = "An error occurred. Please try again.";
  }
  if (status !== 425) {
    return Promise.reject({ ...err, message, response: { ...response, data: { ...data, message: respMessage } } });
  }
  if (config.stop) {
    return Promise.reject({
      ...err,
      message,
      response: {
        ...response,
        status: 400,
        data: { ...data, message: "Error occured. Please try again" },
      },
    });
  }
  config.stop = true;
  return axios(config);
});

const redirectLogin = () => {
  store.dispatch( clearAuthUser() );
};

class APIs {
  userLogin = (params) => apiInstance.post("users", params);
  getAudioBooks = (params) => apiInstance.get('audiobooks', { params });
  voteAudioBook = (params) => apiInstance.post('votes', params);
}

export default new APIs();
