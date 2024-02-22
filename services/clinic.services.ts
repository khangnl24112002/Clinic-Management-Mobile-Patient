import { axiosClient } from "../config/axios";
import { IApiResponse } from "../types";
import {
  IClinicInfo,
  IUserInClinicInfo,
  IClinicCreate,
} from "../types/clinic.types";
import { IRole } from "../types/role.types";
import { IClinicMember } from "../types/staff.types";

export const clinicService = {
  async getUsersInClinic(
    clinicId: string
  ): Promise<IApiResponse<IUserInClinicInfo[]>> {
    return axiosClient.get(`/clinics/${clinicId}/users`);
  },
  async getStaffClinic(clinicId: string): Promise<any> {
    return axiosClient.get(`/staffs`, {
      params: {
        clinicId: clinicId,
      },
    });
  },
  async getAllClinicForPatient(
    name: any
  ): Promise<IApiResponse<IClinicInfo[]>> {
    return axiosClient.get(`/clinics?name=${name}`);
  },
  async getAllClinic(
    id: any,
    moduleId: any
  ): Promise<IApiResponse<IClinicInfo[]>> {
    if (moduleId === 2) {
      return axiosClient.get(`/clinics?ownerId=${id}`);
    } else {
      return axiosClient.get(`/clinics?suid=${id}`);
    }
  },
  async updateClinicInfo(
    clinicId: string,
    clinicInfo: IClinicCreate
  ): Promise<IApiResponse<IClinicInfo>> {
    return axiosClient.put(`/clinics/${clinicId}`, clinicInfo);
  },
  async getClinicByClinicId(
    clinicId: string
  ): Promise<IApiResponse<IClinicInfo>> {
    return axiosClient.get(`/clinics/${clinicId}`);
  },
  async getCLinicByUserId(userId: any) {
    return axiosClient.get(`/clinics`, {
      params: {
        id: userId,
      },
    });
  },
  async createClinic(clinicInfo: IClinicCreate): Promise<IApiResponse<any>> {
    return axiosClient.post("/clinics", clinicInfo);
  },
  async getUserGroupRole(clinicId: any): Promise<IApiResponse<IRole[]>> {
    return axiosClient.get(`/clinics/${clinicId}/user-group-role`);
  },
  async createUserGroupRole(clinicId: any, userGroupRole: any) {
    return axiosClient.post(
      `/clinics/${clinicId}/create-user-group-role`,
      userGroupRole
    );
  },
  async updateUserGroupRole(
    clinicId: any,
    userGroupRoleId: any,
    userGroupRole: any
  ) {
    return axiosClient.put(
      `/clinics/${clinicId}/update-user-group-role/${userGroupRoleId}`,
      userGroupRole
    );
  },
  async deleteUserGroupRole(clinicId: any, userGroupRoleId: any) {
    return axiosClient.delete(
      `/clinics/${clinicId}/delete-user-group-role/${userGroupRoleId}`
    );
  },
  async getClinicMember(clinicId: any): Promise<IApiResponse<IClinicMember[]>> {
    return axiosClient.get(`clinics/${clinicId}/users`);
  },
};
