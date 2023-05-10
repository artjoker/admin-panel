import type { DataNode } from 'antd/es/tree';

import { anyLangValue } from '@/modules/Language';
import { IPage } from '@/models/page.model';

export const mapPagesToTree = (
  pages: Array<IPage>,
  parentPage: IPage | null = null,
): Array<DataNode> => {
  const filteredPages = pages.filter(
    (page) => page.parent?.id === parentPage?.id,
  );

  const sortedPages = [...filteredPages].sort((a, b) => a.sort - b.sort);

  const mappedPages = sortedPages.map<DataNode>((page) => {
    const children = mapPagesToTree(pages, page);

    return {
      title: anyLangValue(page.title),
      key: page.id,
      children,
      isRoot: !parentPage,
      isActive: !!parentPage && page.isActive,
    };
  });

  return mappedPages;
};
