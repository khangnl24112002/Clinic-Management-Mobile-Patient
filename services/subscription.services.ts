import { axiosClient } from "../config/axios";

export const subscriptionService = {
  async getUserSubscriptionById(subscriptionId: any) {
    return axiosClient.get(`/plans/${subscriptionId}`);
  },
};
