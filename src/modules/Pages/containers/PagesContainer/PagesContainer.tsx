import { DataNode } from 'antd/es/tree';
import { memo, useCallback, useMemo, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

import { IPage } from '@/models/page.model';

import {
  CreatePageModal,
  DeletePageModal,
  EditPageSection,
  MovePageSection,
  SortChildrenSection,
} from '../../components';
import { useGetPages, useUpdatePage } from '../../features';
import { mapPagesToTree, getExpandedKeys } from '../../helpers';
import {
  StyledPagesContainer,
  StyledPagesTreeWrapper,
  StyledSearchInput,
  StyledPagesTree,
  StyledAddPageButton,
  StyledRightSectionWrapper,
} from './PagesContainerStyles';
import { showErrorToast, showSuccessToast } from '@/components';
import { Spinner } from '@/ui';
import { UpdatePageDTO } from '../../dtos';

const PagesContainer = () => {
  const { pages, pagesIsLoading } = useGetPages();

  const { updatePage } = useUpdatePage();

  const { t } = useTranslation();

  const [searchValue, setSearchValue] = useState('');

  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);

  const [autoExpandParent, setAutoExpandParent] = useState(true);

  const [createPageModalIsOpen, setCreatePageModalIsOpen] =
    useState<boolean>(false);
  const [parentPageToAdd, setParentPageToAdd] = useState<IPage | null>(null);

  const [pageToEdit, setPageToEdit] = useState<IPage | null>(null);

  const [pageToMove, setPageToMove] = useState<IPage | null>(null);

  const [pageToSortChildren, setPageToSortChildren] = useState<IPage | null>(
    null,
  );

  const [pageToDelete, setPageToDelete] = useState<IPage | null>(null);

  const sortedPages = useMemo(
    () => [...pages].sort((a, b) => a.sort - b.sort),
    [pages],
  );

  const treeData = useMemo(() => mapPagesToTree(sortedPages), [sortedPages]);

  const handleDeleteModalClose = useCallback(() => {
    setPageToDelete(null);
  }, [setPageToDelete]);

  const handleAddModalClose = useCallback(() => {
    setCreatePageModalIsOpen(false);
    setParentPageToAdd(null);
  }, [setCreatePageModalIsOpen, setParentPageToAdd]);

  const handleAdd = useCallback(
    (node: DataNode) => {
      const foundPage = sortedPages.find((page) => page.id === node.key);

      if (foundPage) {
        setParentPageToAdd(foundPage);
      }

      setCreatePageModalIsOpen(true);
    },
    [sortedPages, setCreatePageModalIsOpen, setParentPageToAdd],
  );

  const handleEdit = useCallback(
    (node: DataNode) => {
      const foundPage = sortedPages.find((page) => page.id === node.key);

      if (foundPage) {
        setPageToEdit(foundPage);
        setPageToMove(null);
        setPageToSortChildren(null);
      }
    },
    [sortedPages, setPageToEdit, setPageToMove, setPageToSortChildren],
  );

  const handleMove = useCallback(
    (node: DataNode) => {
      const foundPage = sortedPages.find((page) => page.id === node.key);

      if (foundPage) {
        setPageToEdit(null);
        setPageToMove(foundPage);
        setPageToSortChildren(null);
      }
    },
    [sortedPages, setPageToEdit, setPageToMove, setPageToSortChildren],
  );

  const handleSort = useCallback(
    (node: DataNode) => {
      const foundPage = sortedPages.find((page) => page.id === node.key);

      if (foundPage) {
        setPageToEdit(null);
        setPageToMove(null);
        setPageToSortChildren(foundPage);
      }
    },
    [sortedPages, setPageToEdit, setPageToMove, setPageToSortChildren],
  );

  const handleDelete = useCallback(
    (node: DataNode) => {
      const foundPage = sortedPages.find((page) => page.id === node.key);

      if (foundPage) {
        setPageToDelete(foundPage);
      }
    },
    [sortedPages, setPageToDelete],
  );

  const handleExpand = useCallback(
    (newExpandedKeys: React.Key[]) => {
      setExpandedKeys(newExpandedKeys);
      setAutoExpandParent(false);
    },
    [setExpandedKeys, setAutoExpandParent],
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      const newExpandedKeys = getExpandedKeys(sortedPages, value);
      setExpandedKeys(value ? (newExpandedKeys as React.Key[]) : []);
      setSearchValue(value);
      setAutoExpandParent(true);
    },
    [sortedPages],
  );

  const handlePublish = useCallback(
    (node: DataNode) => {
      const foundPage = sortedPages.find((page) => page.id === node.key);
      if (foundPage) {
        const updatePageDTO = new UpdatePageDTO(foundPage.id, {
          isActive: !foundPage.isActive,
        });
        updatePage(updatePageDTO, {
          onSuccess: () => {
            showSuccessToast({
              message: t('pageUpdatedSuccessfully'),
            });
          },
        });
      }
    },
    [sortedPages, updatePage],
  );

  const handleAddPageToRoot = useCallback(() => {
    setParentPageToAdd(null);
    setCreatePageModalIsOpen(true);
  }, [setParentPageToAdd, setCreatePageModalIsOpen]);

  const handleClosePageToEdit = useCallback(() => {
    setPageToEdit(null);
  }, [setPageToEdit]);

  const handleClosePageToMove = useCallback(() => {
    setPageToMove(null);
  }, [setPageToMove]);

  const handleClosePageToSortChildren = useCallback(() => {
    setPageToSortChildren(null);
  }, [setPageToSortChildren]);
  return (
    <>
      <StyledPagesContainer isLoading={pagesIsLoading}>
        {pagesIsLoading ? (
          <Spinner />
        ) : (
          <StyledPagesTreeWrapper>
            {!!sortedPages && sortedPages.length > 0 ? (
              <>
                <StyledSearchInput
                  placeholder={t('findPage') as string}
                  onChange={handleChange}
                  allowClear
                />
                <StyledPagesTree
                  treeData={treeData}
                  search={searchValue}
                  onAdd={handleAdd}
                  onEdit={handleEdit}
                  onMove={handleMove}
                  onSort={handleSort}
                  onDelete={handleDelete}
                  onExpand={handleExpand}
                  onPublish={handlePublish}
                  autoExpandParent={autoExpandParent}
                  expandedKeys={expandedKeys}
                  selectedKey={
                    pageToEdit?.id || pageToMove?.id || pageToSortChildren?.id
                  }
                />
              </>
            ) : (
              <StyledAddPageButton onClick={handleAddPageToRoot}>
                {t('createSite')}
              </StyledAddPageButton>
            )}
          </StyledPagesTreeWrapper>
        )}
        <AnimatePresence mode="sync">
          {pageToEdit && (
            <StyledRightSectionWrapper key="right-section-wrapper">
              <EditPageSection
                page={pageToEdit}
                onClose={handleClosePageToEdit}
              />
            </StyledRightSectionWrapper>
          )}
          {pageToMove && (
            <StyledRightSectionWrapper key="right-section-wrapper">
              <MovePageSection
                pages={sortedPages}
                page={pageToMove}
                onClose={handleClosePageToMove}
              />
            </StyledRightSectionWrapper>
          )}
          {pageToSortChildren && (
            <StyledRightSectionWrapper key="right-section-wrapper">
              <SortChildrenSection
                pages={sortedPages}
                page={pageToSortChildren}
                onClose={handleClosePageToSortChildren}
              />
            </StyledRightSectionWrapper>
          )}
        </AnimatePresence>
      </StyledPagesContainer>
      <CreatePageModal
        pages={sortedPages}
        parentPage={parentPageToAdd}
        isOpen={createPageModalIsOpen}
        onClose={handleAddModalClose}
      />
      <DeletePageModal page={pageToDelete} onClose={handleDeleteModalClose} />
    </>
  );
};

export default memo(PagesContainer);
