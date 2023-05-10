import { ICreatePageDTO } from '@/models/page.model';

import { ICreatePageValues, PageFieldName } from '../types';

class CreatePageDTO implements ICreatePageDTO {
  content?;
  parentId;
  isActive;
  urlSlug;
  title;
  sort;
  publishedAt;

  constructor(values: ICreatePageValues) {
    this.publishedAt = values[PageFieldName.PUBLISHED_AT];
    this.content = values[PageFieldName.CONTENT];
    this.parentId = values[PageFieldName.PARENT_ID];
    this.isActive = values[PageFieldName.IS_ACTIVE];
    this.urlSlug = values[PageFieldName.URL_SLUG];
    this.title = values[PageFieldName.TITLE];
    this.sort = values[PageFieldName.SORT];
  }
}

export default CreatePageDTO;
