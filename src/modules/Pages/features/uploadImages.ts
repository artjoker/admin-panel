import { PageAPI } from '@/api';
import { prepareMutation } from '@/utils';
import { useMutation } from '@tanstack/react-query';

export const useUploadImages = (id = '') => {
  const mutation = useMutation((file: File) => PageAPI.uploadImage(id, file));
  return prepareMutation('uploadImages', mutation);
};

export default useUploadImages;
