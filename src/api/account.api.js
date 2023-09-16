import { ServiceBase } from "./base";

class AccountService extends ServiceBase {
  create = async (data) => {
    const res = await this.post(`/account/`, data);
    return res.data;
  };
  getDetail = async (data) => {
    const res = await this.get(`/account/`, data);
    return res.data;
  };
  getList = async (data) => {
    const res = await this.get(`/account`, { params: data });
    return res.data;
  };
  update = async (data) => {
    const res = await this.patch(`/account/`, data);
    return res.data;
  };
  remove = async (data) => {
    const res = await this.delete(`/account/`, { data });
    return res.data;
  };
}

const accountService = new AccountService();

export default accountService;
