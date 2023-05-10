import { useMemo, useState, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Avatar, List, Typography } from 'antd';
import { DragOutlined } from '@ant-design/icons';
import {
  useDroppable,
  DndContext,
  DragOverlay,
  type DragStartEvent,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

import { IPage } from '@/models/page.model';
import { anyLangValue } from '@/modules/Language';
import { SortableItem, showErrorToast } from '@/components';

import { useUpdatePage } from '../../features';
import {
  StyledSortChildrenSection,
  StyledButtonContainer,
  StyledButton,
  PageList,
  PageItem,
  PageItemTitle,
  PageItemUrlSlug,
} from './SortChildrenSectionStyles';
import { UpdatePageDTO } from '../../dtos';

interface ISortChildrenSectionProps {
  pages: Array<IPage>;
  page: IPage;
  onClose: () => void;
}

const SortChildrenSection = ({
  pages,
  page,
  onClose,
}: ISortChildrenSectionProps) => {
  const { t } = useTranslation();

  const [activeDragId, setActiveDragId] = useState<string | null>(null);

  const draggingPage = pages.find((page) => page.id === activeDragId);

  const { updatePage } = useUpdatePage();

  const pageChildren = useMemo(
    () => pages.filter((p) => p.parent?.id === page.id),
    [page, pages],
  );

  const [localChildren, setLocalChildren] = useState(pageChildren);

  useEffect(() => {
    setLocalChildren(pageChildren);
  }, [pageChildren]);

  const pageIds = useMemo(
    () => pageChildren.map((page) => page.id),
    [pageChildren],
  );

  const handleDragStart = useCallback(({ active }: DragStartEvent) => {
    if (!active) {
      return;
    }

    setActiveDragId(active.id as string);
  }, []);

  const handleDragEnd = useCallback(
    ({ active, over }: DragEndEvent) => {
      setActiveDragId(null);

      if (!over) {
        return;
      }

      const activeIndex = pageIds.indexOf(active.id as string);
      const overIndex = pageIds.indexOf(over.id as string);

      const updateSort = (sort: number) => {
        const newLocalChildren = pageChildren
          .map((page) =>
            page.id === (active.id as string) ? { ...page, sort } : page,
          )
          .sort((a, b) => a.sort - b.sort);

        setLocalChildren(newLocalChildren);

        const updatePageDTO = new UpdatePageDTO(active.id as string, { sort });
        updatePage(updatePageDTO, {
          onError: () => {
            setLocalChildren(pageChildren);
            showErrorToast({
              message: 'Something went wrong',
            });
          },
        });
      };

      if (activeIndex !== overIndex) {
        if (overIndex === 0) {
          updateSort(pageChildren[overIndex].sort / 2);
          return;
        }

        if (activeIndex > overIndex) {
          updateSort(
            (pageChildren[overIndex - 1].sort + pageChildren[overIndex].sort) /
              2,
          );
          return;
        }

        if (overIndex !== pageChildren.length - 1) {
          updateSort(
            (pageChildren[overIndex].sort + pageChildren[overIndex + 1].sort) /
              2,
          );
          return;
        }

        updateSort(pageChildren[overIndex].sort + 1);
      }
    },
    [pageChildren, pageIds, updatePage],
  );

  const handleDragCancel = useCallback(() => {
    setActiveDragId(null);
  }, []);

  return (
    <StyledSortChildrenSection>
      <Typography.Title level={2}>{t('sortChildPages')}</Typography.Title>
      <Typography.Paragraph>{t('dragAndDropToSortPages')}</Typography.Paragraph>
      <DndContext
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
        <SortableContext items={pageIds} strategy={verticalListSortingStrategy}>
          <PageList>
            {localChildren.map((page) => (
              <SortableItem
                key={page.id}
                id={page.id}
                render={({ setNodeRef, style, listeners, attributes }) => (
                  <PageItem
                    ref={setNodeRef}
                    style={style}
                    {...listeners}
                    {...attributes}
                    $isDragging={activeDragId === page.id}
                  >
                    <div>
                      <PageItemTitle>{anyLangValue(page.title)}</PageItemTitle>
                      <PageItemUrlSlug>{page.urlSlug}</PageItemUrlSlug>
                    </div>
                    <DragOutlined />
                  </PageItem>
                )}
              />
            ))}
          </PageList>
        </SortableContext>
        <DragOverlay>
          {activeDragId ? (
            <PageItem $isOverlay>
              <div>
                <PageItemTitle>
                  {anyLangValue((draggingPage as IPage).title)}
                </PageItemTitle>
                <PageItemUrlSlug>
                  {(draggingPage as IPage).urlSlug}
                </PageItemUrlSlug>
              </div>
              <DragOutlined />
            </PageItem>
          ) : null}
        </DragOverlay>
      </DndContext>
      <StyledButtonContainer>
        <StyledButton onClick={onClose} type="default">
          {t('close')}
        </StyledButton>
      </StyledButtonContainer>
    </StyledSortChildrenSection>
  );
};

export default SortChildrenSection;
