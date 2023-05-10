import { ReactNode } from 'react';
import styled from 'styled-components';
import Highlighter from 'react-highlight-words';
import { TFunction } from 'i18next';
import type { DataNode } from 'antd/es/tree';
import { Button, Tooltip } from 'antd';
import {
  PlusOutlined,
  DeleteOutlined,
  FullscreenOutlined,
  UnorderedListOutlined,
  EyeOutlined,
} from '@ant-design/icons';

import { COLORS } from '@/theme';
import { IPage } from '@/models/page.model';
import { Language } from '@/modules/Language';
import { mapPagesToTree } from './mappers';

const getParentKey = (key: React.Key, tree: DataNode[]): React.Key => {
  let parentKey: React.Key;
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i];
    if (node.children) {
      if (node.children.some((item) => item.key === key)) {
        parentKey = node.key;
      } else if (getParentKey(key, node.children)) {
        parentKey = getParentKey(key, node.children);
      }
    }
  }
  return parentKey!;
};

export const getExpandedKeys = (pages: IPage[], searchValue: string) => {
  return pages
    .map((item) => {
      if (
        item.title[Language.EN]
          .toLocaleLowerCase()
          .indexOf(searchValue.toLocaleLowerCase()) > -1
      ) {
        return getParentKey(item.id, mapPagesToTree(pages));
      }
      return null;
    })
    .filter((item, i, self) => item && self.indexOf(item) === i);
};

export const withSearch = (
  treeData: Array<DataNode>,
  search: string,
): Array<DataNode> => {
  const renderTitle = (node: DataNode) =>
    search ? (
      <Highlighter
        highlightStyle={{ backgroundColor: COLORS.HIGHLIGHTED, padding: 0 }}
        searchWords={[search]}
        textToHighlight={node.title as string}
        autoEscape
      />
    ) : (
      node.title
    );

  const mapNode = (node: DataNode): DataNode => {
    if (!node.children?.length) {
      return { ...node, title: renderTitle(node) };
    }

    return {
      ...node,
      title: renderTitle(node),
      children: node.children.map((node) => mapNode(node)),
    };
  };

  return treeData.map((node) => mapNode(node));
};

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const StyledIconButton = styled(Button)`
  && {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 18px;
    min-width: 18px;
    height: 18px;
    min-height: 18px;
    font-size: 10px;
  }
`;

interface WithButtonsHandlers {
  onAdd: (node: DataNode) => void;
  onMove: (node: DataNode) => void;
  onSort: (node: DataNode) => void;
  onPublish: (node: DataNode) => void;
  onDelete: (node: DataNode) => void;
}

export const withButtons = (
  treeData: Array<DataNode>,
  handlers: WithButtonsHandlers,
  t: TFunction,
): Array<DataNode> => {
  const renderTitle = (nodes: DataNode) => {
    const node = nodes as unknown as DataNode & {
      isRoot: boolean;
      isActive: boolean;
    };
    return (
      <TitleContainer>
        {node.title as ReactNode}
        <Tooltip title={t('createPage')}>
          <StyledIconButton
            type="primary"
            shape="circle"
            onClick={(e) => {
              e.stopPropagation();
              handlers.onAdd(node);
            }}
          >
            <PlusOutlined />
          </StyledIconButton>
        </Tooltip>
        {!node.isRoot && (
          <Tooltip title={t('movePage')}>
            <StyledIconButton
              shape="circle"
              onClick={(e) => {
                e.stopPropagation();
                handlers.onMove(node);
              }}
            >
              <FullscreenOutlined />
            </StyledIconButton>
          </Tooltip>
        )}
        {!!(node.children ?? []).length && (
          <Tooltip title={t('sortChildren')}>
            <StyledIconButton
              shape="circle"
              onClick={(e) => {
                e.stopPropagation();
                handlers.onSort(node);
              }}
            >
              <UnorderedListOutlined />
            </StyledIconButton>
          </Tooltip>
        )}
        {!node.isRoot && (
          <Tooltip title={t('deletePage')}>
            <StyledIconButton
              shape="circle"
              onClick={(e) => {
                e.stopPropagation();
                handlers.onDelete(node);
              }}
            >
              <DeleteOutlined />
            </StyledIconButton>
          </Tooltip>
        )}
        {!node.isRoot && (
          <Tooltip title={t('active')}>
            <StyledIconButton
              shape="circle"
              type={node.isActive ? 'primary' : 'default'}
              onClick={(e) => {
                e.stopPropagation();
                handlers.onPublish(node);
              }}
            >
              <EyeOutlined />
            </StyledIconButton>
          </Tooltip>
        )}
      </TitleContainer>
    );
  };

  const mapNode = (node: DataNode): DataNode => {
    if (!node.children?.length) {
      return { ...node, title: renderTitle(node) };
    }

    return {
      ...node,
      title: renderTitle(node),
      children: node.children.map(mapNode),
    };
  };

  return treeData.map(mapNode);
};
