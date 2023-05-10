import { FilterValue, SorterResult, SortOrder } from 'antd/es/table/interface';

import { IUser, IUsersSortDTO, Sort } from '@/models/user.model';

export const mapTableSortOrder = (sortOrder: SortOrder): Sort | null => {
  if (sortOrder === 'ascend') {
    return Sort.ASC;
  }

  if (sortOrder === 'descend') {
    return Sort.DESC;
  }

  return null;
};

export const getFilterValue = <TKey extends keyof IUser>(
  filters: Record<string, FilterValue | null>,
  filterKey: TKey,
): IUser[TKey] | undefined => {
  const filterArr = filters[filterKey];
  return filterArr ? (filterArr[0] as IUser[TKey]) : undefined;
};

export const getSortValues = (
  sorter: SorterResult<IUser> | SorterResult<IUser>[],
): IUsersSortDTO => {
  if (Array.isArray(sorter)) {
    return sorter.reduce<IUsersSortDTO>((acc, sort) => {
      const columnKey = sort.columnKey as keyof IUsersSortDTO;
      const sortOrder =
        (sort.order && mapTableSortOrder(sort.order)) ?? undefined;
      return { ...acc, [columnKey]: sortOrder };
    }, {});
  }
  const columnKey = sorter.columnKey as keyof IUsersSortDTO;
  const sortOrder =
    (sorter.order && mapTableSortOrder(sorter.order)) ?? undefined;
  return { [columnKey]: sortOrder };
};

export const getValidObject = (
  obj?: Record<string, any>,
): Record<string, any> => {
  if (!obj) {
    return {};
  }
  return Object.fromEntries(
    Object.entries(obj).filter(([_, v]) => v !== undefined),
  );
};
