import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Typography } from 'antd';
import type { DataNode } from 'antd/es/tree';

import { IPage } from '@/models/page.model';

import PageSelect from '../PageSelect/PageSelect';
import MovePageModal from '../MovePageModal/MovePageModal';
import { mapPagesToTree } from '../../helpers/mappers';
import {
  StyledMovePageSection,
  StyledButtonContainer,
  StyledButton,
  StyledMoveToRoot,
} from './MovePageSectionStyles';

interface IMovePageSectionProps {
  pages: Array<IPage>;
  page: IPage;
  onClose: () => void;
}

const MovePageSection = ({ pages, page, onClose }: IMovePageSectionProps) => {
  const { t } = useTranslation();

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [parent, setParent] = useState<IPage | null>(null);

  const treeData = useMemo(() => {
    const filteredPages = pages.filter((p) => p.id !== page?.id);
    return mapPagesToTree(filteredPages);
  }, [page, pages]);

  const handleSelectNode = useCallback(
    (node: DataNode) => {
      const foundPage = pages.find((page) => page.id === node.key);

      if (foundPage) {
        setParent(foundPage);
        setModalIsOpen(true);
      }
    },
    [pages],
  );

  const handleModalClose = useCallback(() => {
    setParent(null);
    setModalIsOpen(false);
  }, []);

  const handleModalOk = () => {
    // onClose();  FIXME:
  };

  const handleMoveToRoot = useCallback(() => {
    setParent(null);
    setModalIsOpen(true);
  }, []);

  return (
    <StyledMovePageSection>
      <Typography.Title level={2}>{t('movePage')}</Typography.Title>
      <Typography.Paragraph>
        {t('selectTheDestinationWhereYouWouldLikeToMoveThePage')}{' '}
        <StyledMoveToRoot onClick={handleMoveToRoot} color="primary">
          {t('moveToRoot')}
        </StyledMoveToRoot>
      </Typography.Paragraph>
      <PageSelect treeData={treeData} onSelect={handleSelectNode} />
      <StyledButtonContainer>
        <StyledButton onClick={onClose} type="default">
          {t('close')}
        </StyledButton>
      </StyledButtonContainer>
      <MovePageModal
        isOpen={modalIsOpen}
        pages={pages}
        page={page}
        parent={parent}
        onClose={handleModalClose}
        onOk={handleModalOk}
      />
    </StyledMovePageSection>
  );
};

export default MovePageSection;
