import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Upload from 'antd/es/upload/Upload';
import { UploadFile } from 'antd';
import { RcFile } from 'antd/es/upload';
import ImgCrop from 'antd-img-crop';

import { Modal, showErrorToast } from '@/components';
import {
  getBase64,
  IMAGE_ASPECT_RATIO,
  IMAGE_MIME_TYPES,
  MAX_IMAGE_SIZE,
} from '../../helpers';
import { useUploadImages } from '../../features';

interface IImagesFormBlock {
  id?: string;
  value?: Array<string>;
  defaultFileList?: Array<UploadFile>;
  onChange?: (value: Array<string>) => void;
}

const ImagesFormBlock = ({
  onChange,
  value,
  id,
  defaultFileList,
}: IImagesFormBlock) => {
  const { t } = useTranslation();

  const { uploadImages } = useUploadImages(id);

  const [previewOpen, setPreviewOpen] = useState(false);

  const [previewImage, setPreviewImage] = useState('');

  const handleDelete = useCallback(
    (file: UploadFile) => {
      onChange?.(
        (value ?? []).filter((image) => {
          return image !== file.uid;
        }),
      );
    },
    [onChange, value],
  );

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleCancel = () => setPreviewOpen(false);

  const handleUpload = useCallback(
    async (file: RcFile) => {
      if (file.size > MAX_IMAGE_SIZE) {
        showErrorToast({
          message: `File size exceeds the limit of ${
            MAX_IMAGE_SIZE / 1024 / 1024
          } MB`,
        });
        return false;
      }

      uploadImages(file, {
        onSuccess: (data) => {
          onChange?.([...(value ?? []), data]);
        },
        onError: (error) => {
          const message =
            error instanceof Error ? error.message : 'Upload failed';
          showErrorToast({
            message,
          });
        },
      });
      return false;
    },
    [onChange, uploadImages, value],
  );

  return (
    <div>
      <ImgCrop
        quality={1}
        rotationSlider
        aspectSlider
        aspect={IMAGE_ASPECT_RATIO}
        modalTitle={t('editImage') as string}
        modalOk={t('save') as string}
        modalCancel={t('cancel') as string}
      >
        <Upload
          showUploadList
          accept={IMAGE_MIME_TYPES}
          listType="picture-card"
          previewFile={getBase64}
          multiple
          defaultFileList={defaultFileList}
          onPreview={handlePreview}
          onRemove={handleDelete}
          beforeUpload={handleUpload}
        >
          + {t('upload')}
        </Upload>
      </ImgCrop>
      <Modal
        open={previewOpen}
        title={t('preview')}
        footer={null}
        onCancel={handleCancel}
        destroyOnClose
        centered
      >
        <img style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </div>
  );
};

export default ImagesFormBlock;
