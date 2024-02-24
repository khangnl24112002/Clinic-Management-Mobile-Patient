import { axiosClient } from "../config/axios";
import { IApiResponse } from "../types";
import { INews, INewsResponse } from "../types/news.type";

export const newsServiceApi = {
  getNews(
    clinicId: string,
    isShow?: boolean,
    pageSize?: number,
    pageIndex?: number
  ): Promise<IApiResponse<INewsResponse>> {
    return axiosClient.get(`/news`, {
      params: {
        clinicId,
        isShow,
        pageSize,
        pageIndex,
      },
    });
  },
  getAllNews(
    title?: string,
    isShow?: boolean,
    pageSize?: number,
    pageIndex?: number
  ): Promise<IApiResponse<INewsResponse>> {
    return axiosClient.get(`/news`, {
      params: {
        title,
        isShow,
        pageSize,
        pageIndex,
      },
    });
  },
  getNewsDetail(newsId: number): Promise<IApiResponse<INews>> {
    return axiosClient.get(`/news/${newsId}`);
  },
};
