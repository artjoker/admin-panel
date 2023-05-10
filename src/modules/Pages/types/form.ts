import { Dayjs } from 'dayjs';

import { MultiLang } from '@/modules/Language';
import { PageType } from '@/models/page.model';

export enum PageFieldName {
  ID = 'id',
  TITLE = 'title',
  URL_SLUG = 'urlSlug',
  PUBLISHED_AT = 'PUBLISHED_AT',
  CONTENT = 'content',
  SORT = 'sort',
  IS_ACTIVE = 'isActive',
  PARENT_ID = 'parentId',
  IMAGES = 'images',
  PAGE_TYPE = 'pageType',
}

export interface ICreatePageFormValues {
  [PageFieldName.TITLE]: MultiLang;
  [PageFieldName.URL_SLUG]: string;
  [PageFieldName.IS_ACTIVE]?: boolean;
}

export interface ICreatePageValues extends ICreatePageFormValues {
  [PageFieldName.PUBLISHED_AT]?: string;
  [PageFieldName.CONTENT]?: MultiLang;
  [PageFieldName.PARENT_ID]?: string;
  [PageFieldName.SORT]: number;
}

export interface IEditPageFormValues {
  [PageFieldName.TITLE]?: MultiLang;
  [PageFieldName.URL_SLUG]?: string;
  [PageFieldName.PUBLISHED_AT]?: string;
  [PageFieldName.CONTENT]?: MultiLang;
  [PageFieldName.IS_ACTIVE]?: boolean;
  [PageFieldName.IMAGES]?: Array<string>;
  [PageFieldName.PARENT_ID]?: string;
  [PageFieldName.SORT]?: number;
  [PageFieldName.PAGE_TYPE]?: PageType;
}

export interface IEditPageValues extends IEditPageFormValues {}
export interface ICreatePageValues {}
