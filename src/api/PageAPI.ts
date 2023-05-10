import {
  IPage,
  IGetOnePageDTO,
  ICreatePageDTO,
  IUpdatePageDTO,
  IDeletePageDTO,
  staticPageEndpoints,
  getPageEndpoints,
} from '@/models/page.model';
import { httpClient } from '@/utils';

class PageAPI {
  static async getPages(): Promise<Array<IPage>> {
    const { GET_PAGES } = staticPageEndpoints;
    const { data } = await httpClient.get<Array<IPage>>(GET_PAGES);
    return data;
  }

  static async getPage({ slug }: IGetOnePageDTO): Promise<IPage> {
    const { GET_PAGE_BY_SLUG } = getPageEndpoints(slug);
    const { data } = await httpClient.get<IPage>(GET_PAGE_BY_SLUG);
    return data;
  }

  static async createPage(payload: ICreatePageDTO): Promise<IPage> {
    const { CREATE_PAGE } = staticPageEndpoints;
    const { data } = await httpClient.post<IPage>(CREATE_PAGE, payload);
    return data;
  }

  static async updatePage({ id, ...body }: IUpdatePageDTO): Promise<IPage> {
    const { UPDATE_PAGE } = getPageEndpoints(id);
    const { data } = await httpClient.patch<IPage>(UPDATE_PAGE, body);
    return data;
  }

  static async deletePage(payload: IDeletePageDTO): Promise<IPage> {
    const { DELETE_PAGE } = getPageEndpoints(payload.id);
    const { data } = await httpClient.delete<IPage>(DELETE_PAGE);
    return data;
  }

  static async uploadImage(id: string, file: File): Promise<string> {
    const formData = new FormData();
    formData.append('image', file);
    const { UPLOAD_IMAGE } = getPageEndpoints(id);

    const { data } = await httpClient.post<string>(UPLOAD_IMAGE, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Accept: 'image/*',
      },
    });

    return data;
  }
}

export default PageAPI;
