import { axiosClient } from "../config/axios";

export const notificationService = {
  async postFCMTokenToServer(userId: string | undefined, token: string) {
    return axiosClient.post(`/notification/create-user-token`, {
      userId,
      token,
    });
  },
  async deleteFCMToken(userId: string, token: string) {
    return axiosClient.delete(`/notification/delete-user-token`, {
      data: {
        userId,
        token,
      },
    });
  },
};
