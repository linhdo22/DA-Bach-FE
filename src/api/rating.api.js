import { ServiceBase } from "./base";

class RatingService extends ServiceBase {
  getList = async (params) => {
    const res = await this.get(`/rating`, { params });
    return res.data;
  };
  create = async (data) => {
    const res = await this.post(`/rating`, data);
    return res.data;
  };
  check = async (params) => {
    const res = await this.get(`/rating/check`, { params });
    return res.data;
  };
}

const ratingService = new RatingService();

export default ratingService;
