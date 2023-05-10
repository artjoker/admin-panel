import { useQuery } from '@tanstack/react-query';

import { UserAPI } from '@/api';
import { IFindUsersDTO } from '@/models/user.model';
import { prepareQueryResult } from '@/utils';

const serializeObject = (obj: Record<string, string | boolean>): string => {
  const objectKeys = Object.keys(obj);
  return objectKeys
    .reduce((acc, key) => acc.concat(`${key}:${obj[key]}`), [] as string[])
    .join(',');
};

// TODO: Implement universal serializer for generating keys
const generateUseFindUsersKey = (payload: IFindUsersDTO): string => {
  let key = `page:${payload.page};perPage:${payload.perPage}`;
  if (payload.search) {
    key += `;search:${payload.search}`;
  }
  if (payload.filters) {
    key += `;filters:${serializeObject(
      payload.filters as Record<string, string | boolean>,
    )}`;
  }
  if (payload.sort) {
    key += `;sort:${serializeObject(
      payload.sort as Record<string, string | boolean>,
    )}`;
  }
  return key;
};

const useFindUsers = (payload: IFindUsersDTO) => {
  const result = useQuery(
    ['found-users', generateUseFindUsersKey(payload)],
    () => UserAPI.findUsers(payload),
  );

  return prepareQueryResult('foundUsers', result, null, true);
};

export default useFindUsers;
