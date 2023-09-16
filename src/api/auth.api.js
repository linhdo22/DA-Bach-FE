import { ServiceBase } from "./base";

class AuthService extends ServiceBase {
  login = async (data) => {
    const res = await this.post(`/auth/sign-in/`, data);
    console.log(res);
    return res.data;
  };
  logout = async (data) => {
    const res = await this.post(`/auth/logout/`, data);
    return res.data;
  };
}

const authService = new AuthService();

export default authService;
