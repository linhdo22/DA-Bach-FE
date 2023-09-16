import { ServiceBase } from "./base";

class DrugService extends ServiceBase {
  create = async (data) => {
    const res = await this.post(`/drug/`, data);
    return res.data;
  };
  search = async (data) => {
    const res = await this.get(`/drug/`, { params: data });
    return res.data;
  };
  getList = async (data) => {
    const res = await this.get(`/drug`, { params: data });
    return res.data;
  };
  update = async (data) => {
    const res = await this.patch(`/drug/`, data);
    return res.data;
  };
  remove = async (data) => {
    const res = await this.delete(`/drug/`, { data });
    return res.data;
  };
}

const drugService = new DrugService();

export default drugService;
