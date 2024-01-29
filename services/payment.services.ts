import { axiosClient } from "../config/axios";

export const paymentService = {
  async createPayment(paymentInfo: any) {
    return axiosClient.post("/payment", paymentInfo);
  },
};
