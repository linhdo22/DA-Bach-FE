import { ServiceBase } from "./base";

class BookingService extends ServiceBase {
  getList = async () => {
    const res = await this.get(`/booking`);
    return res.data;
  };
  getById = async (id) => {
    const res = await this.get(`/booking/${id}`);
    return res.data;
  };
  updateDiagnosis = async (data) => {
    const res = await this.patch(`/booking/diagnosis`, data);
    return res.data;
  };
  finish = async (data) => {
    const res = await this.patch(`/booking/finish`, data);
    return res.data;
  };
  upload = async (data) => {
    const res = await this.patch(`/booking/upload`, data);
    return res.data;
  };
  remove = async (data) => {
    const res = await this.delete(`/booking/`, { data });
    return res.data;
  };
}

const bookingService = new BookingService();

export default bookingService;
