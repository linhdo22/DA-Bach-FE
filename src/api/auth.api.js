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
  forgotPassword = async (data) => {
    const res = await this.post(`/auth/forgot-password/`, data);
    return res.data;
  };
  resetPassword = async (data) => {
    const res = await this.post(`/auth/reset-password/`, data);
    return res.data;
  };
}

const authService = new AuthService();

export default authService;
