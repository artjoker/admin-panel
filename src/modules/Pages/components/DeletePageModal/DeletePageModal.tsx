import { Modal, showErrorToast, showSuccessToast } from '@/components';
import { IPage } from '@/models/page.model';
import { anyLangValue } from '@/modules/Language';
import { t } from 'i18next';

import { useDeletePage } from '../../features';
import { StyledModalInner } from './DeletePageModalStyles';
import { DeletePageDTO } from '../../dtos';

interface IDeletePageModalProps {
  page: IPage | null;
  onClose: () => void;
}

const DeletePageModal = ({ page, onClose }: IDeletePageModalProps) => {
  const { deletePage } = useDeletePage();

  const handleOk = () => {
    if (!page) {
      return;
    }
    const createPageDTO = new DeletePageDTO(page.id);
    deletePage(createPageDTO, {
      onSuccess: () => {
        showSuccessToast({
          message: t('pageDeletedSuccessfully'),
        });
      },
      onError: () => {
        showErrorToast({
          message: 'Something went wrong',
        });
      },
    });

    onClose();
  };

  return (
    <Modal
      open={!!page}
      onOk={handleOk}
      onCancel={onClose}
      title={t('deletePage')}
      okText={t('yes')}
      cancelText={t('no')}
    >
      {page && (
        <StyledModalInner>
          {t('areYouSureYouWantToDeletePage', {
            pageName: anyLangValue(page.title),
          })}
        </StyledModalInner>
      )}
    </Modal>
  );
};

export default DeletePageModal;
