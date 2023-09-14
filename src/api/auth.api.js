import { ServiceBase } from "services/http/service-base";

class AuthService extends ServiceBase {
  login = async (data) => {
    const res = await this.post(`/sign-in/`, data);
    return res.data;
  };
  register = async (data) => {
    const res = await this.post(`/sign-up/`, data);
    return res.data;
  };
}

const authService = new AuthService();

export default authService;
