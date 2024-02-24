export interface INews {
  id: number;
  title: string;
  content: string;
  logo: string;
  clinicId: string;
  isShow: boolean;
  createdAt: string;
  updatedAt: string;
  clinicName: string;
}

export interface INewsResponse {
  data: INews[];
  pageSize: number;
  currentPage: number;
  total: number;
}
