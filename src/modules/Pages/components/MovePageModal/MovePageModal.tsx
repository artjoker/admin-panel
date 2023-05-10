import { useTranslation } from 'react-i18next';

import { Modal, showErrorToast, showSuccessToast } from '@/components';
import { IPage } from '@/models/page.model';

import { useUpdatePage } from '../../features';
import { StyledModalInner } from './MovePageModalStyles';
import { UpdatePageDTO } from '../../dtos';

interface IMovePageModalProps {
  isOpen: boolean;
  pages: Array<IPage>;
  page: IPage;
  parent: IPage | null;
  onClose: () => void;
  onOk: () => void;
}

const MovePageModal = ({
  isOpen,
  pages,
  page,
  parent,
  onClose,
  onOk,
}: IMovePageModalProps) => {
  const { t } = useTranslation();

  const { updatePage } = useUpdatePage();

  const handleOk = () => {
    if (!page) {
      return;
    }
    const updatePageDTO = new UpdatePageDTO(page.id, {
      parentId: parent ? parent.id : undefined,
      sort: parent
        ? Math.max(...parent.children.map((page) => page.sort)) + 1
        : Math.max(...pages.map((page) => page.sort)) + 1,
    });
    updatePage(updatePageDTO, {
      onSuccess: () => {
        showSuccessToast({
          message: t('pageMovedSuccessfully'),
        });
      },
      onError: () => {
        showErrorToast({
          message: 'Something went wrong',
        });
      },
    });

    onClose();
    onOk();
  };

  return (
    <Modal
      open={isOpen}
      onOk={handleOk}
      onCancel={onClose}
      title={t('movePage')}
      okText={t('yes')}
      cancelText={t('no')}
    >
      {page && (
        <StyledModalInner>
          {t('areYouSureYouWantToMoveThePage')}
        </StyledModalInner>
      )}
    </Modal>
  );
};

export default MovePageModal;
