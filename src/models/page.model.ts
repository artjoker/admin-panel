import { MultiLang } from '@/modules/Language';

import { IBaseEntityModel } from './entity.model';

export enum PageEndpoints {
  ROOT = '/pages',
}

export const staticPageEndpoints = {
  GET_PAGES: PageEndpoints.ROOT,
  CREATE_PAGE: PageEndpoints.ROOT,
};

export const getPageEndpoints = (pageId: string) => ({
  GET_PAGE_BY_SLUG: `${PageEndpoints.ROOT}/${pageId}`,
  UPDATE_PAGE: `${PageEndpoints.ROOT}/${pageId}`,
  DELETE_PAGE: `${PageEndpoints.ROOT}/${pageId}`,
  UPLOAD_IMAGE: `${PageEndpoints.ROOT}/${pageId}/upload`,
});
export enum PageType {
  TEMPLATE = 'template',
  HOME = 'home',
  CONTACTS = 'contacts',
  BLOG = 'blog',
  ARTICLE = 'article',
}

export interface IPage extends IBaseEntityModel {
  title: MultiLang;
  urlSlug: string;
  publishedAt?: string;
  content?: MultiLang;
  sort: number;
  parent: IPage | null;
  isActive?: boolean;
  children: Array<IPage>;
  pageType: PageType;
  images: Array<{ url: string; id: string }>;
}

export interface IGetOnePageDTO {
  slug: string;
}

export interface IBasePageDTO {
  isActive?: boolean;
  urlSlug: string;
  title: MultiLang;
  sort: number;
  content?: MultiLang;
}

export interface ICreatePageDTO extends IBasePageDTO {
  publishedAt?: string;
  parentId?: string;
}

export interface IUpdatePageDTO extends Partial<IBasePageDTO> {
  id: string;
  publishedAt?: string;
  content?: MultiLang;
  parentId?: string;
  images?: Array<string>;
  pageType?: PageType;
}

export interface IDeletePageDTO {
  id: string;
}
