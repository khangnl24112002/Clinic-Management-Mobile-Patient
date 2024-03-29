import { axiosClient } from "../config/axios";
import {
  ILoginRequest,
  ILoginResponse,
  IApiResponse,
  IRegisterRequest,
  IRegisterResponse,
  ILoginWithGoogleRequest,
  ILoginWithGoogleResponse,
  ILoginResponseData,
  ILinkAccountRequest,
  IResetPasswordResponse,
  IUserInfoUpdateRequest,
  IChangePasswordRequest,
  IAddNewPasswordRequest,
  IUserInfo,
} from "../types";
import { IInviteClinicMemberRequest } from "../types/clinic.types";

export const authApi = {
  async login(data: ILoginRequest): Promise<IApiResponse<ILoginResponse>> {
    // Gửi request và nhận response từ server
    return axiosClient.post("/auth/login", data);
  },
  register(data: IRegisterRequest): Promise<IApiResponse<IRegisterResponse>> {
    return axiosClient.post("/auth/register", {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
      moduleId: 3,
    });
  },
  loginWithGoogle(
    data: ILoginWithGoogleRequest
  ): Promise<IApiResponse<ILoginWithGoogleResponse>> {
    return axiosClient.post("/auth/account", data);
  },
  getUserByAccountId(accountId: string, provider: string): Promise<any> {
    return axiosClient.get(`/auth/account`, {
      params: {
        key: accountId,
        provider: provider,
      },
    });
  },
  sendEmailVerifyUser(data: {
    email: string;
    key: string;
    provider: string;
  }): Promise<any> {
    return axiosClient.get("/auth/user/send-email-verify-user", {
      params: data,
    });
  },

  linkAccount(data: ILinkAccountRequest): Promise<any> {
    return axiosClient.post("/auth/link-account", data);
  },

  getLinkAccount(userId: string): Promise<any> {
    return axiosClient.get(`/auth/${userId}/accounts`);
  },

  disConnectLinkAccount(userId: string, accountId: string): Promise<any> {
    return axiosClient.delete(`/auth/${userId}/accounts/${accountId}`);
  },

  addingAdditionalPassword(email: string, password: string): Promise<any> {
    return axiosClient.put(`/auth/add-new-password`, { email, password });
  },
  inviteMemberToClinic(userInfo: IInviteClinicMemberRequest): Promise<any> {
    return axiosClient.post(`/auth/invite`, userInfo);
  },

  resetPassword(email: string): Promise<IResetPasswordResponse> {
    return axiosClient.post("/auth/reset-password", { email });
  },

  resendVerifyEmail(email: string): Promise<IApiResponse<any>> {
    return axiosClient.post(`/auth/resend-verify-email`, {
      email: email,
    });
  },

  updateUserInfo(data: IUserInfoUpdateRequest, userId: string): Promise<any> {
    return axiosClient.put(`/auth/user/${userId}`, data);
  },

  changePassword(data: IChangePasswordRequest, userId: string): Promise<any> {
    return axiosClient.post(`/auth/${userId}/change-password`, data);
  },

  addNewPassword(data: IAddNewPasswordRequest): Promise<any> {
    return axiosClient.put("/auth/add-new-password", data);
  },

  findUserByEmail(
    email: string,
    emailVerified?: string
  ): Promise<IApiResponse<IUserInfo>> {
    return axiosClient.get("/auth/find-user-by-email", {
      params: { email, emailVerified },
    });
  },
};
