import { IUpdatePageDTO } from '@/models/page.model';

import { IEditPageFormValues, PageFieldName } from '../types';

class UpdatePageDTO implements IUpdatePageDTO {
  id;
  publishedAt?;
  content?;
  parentId?;
  images?;
  isActive?;
  urlSlug?;
  title?;
  sort?;
  pageType?;

  constructor(id: string, values: IEditPageFormValues) {
    this.id = id;
    this.publishedAt = values[PageFieldName.PUBLISHED_AT];
    this.content = values[PageFieldName.CONTENT];
    this.parentId = values[PageFieldName.PARENT_ID];
    this.isActive = values[PageFieldName.IS_ACTIVE];
    this.urlSlug = values[PageFieldName.URL_SLUG];
    this.title = values[PageFieldName.TITLE];
    this.sort = values[PageFieldName.SORT];
    this.images = values[PageFieldName.IMAGES];
    this.pageType = values[PageFieldName.PAGE_TYPE];
  }
}

export default UpdatePageDTO;
