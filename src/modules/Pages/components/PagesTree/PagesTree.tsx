import { memo, useMemo } from 'react';
import { Tree } from 'antd';
import type { DataNode, EventDataNode } from 'antd/es/tree';
import { FileFilled } from '@ant-design/icons';

import { withSearch, withButtons } from '../../helpers/tree';
import { useTranslation } from 'react-i18next';

interface IPagesTreeProps {
  className?: string;
  treeData: DataNode[];
  search: string;
  selectedKey?: string;
  expandedKeys: React.Key[];
  autoExpandParent: boolean;
  onAdd: (node: DataNode) => void;
  onEdit: (node: DataNode) => void;
  onMove: (node: DataNode) => void;
  onSort: (node: DataNode) => void;
  onDelete: (node: DataNode) => void;
  onPublish: (node: DataNode) => void;
  onExpand: (newExpandedKeys: React.Key[]) => void;
}

const PagesTree = ({
  className,
  treeData,
  search,
  onAdd,
  onEdit,
  onMove,
  onSort,
  onDelete,
  onExpand,
  onPublish,
  selectedKey,
  expandedKeys,
  autoExpandParent,
}: IPagesTreeProps) => {
  const { t } = useTranslation();

  const mappedTreeData = useMemo(() => {
    const treeWithSearch = withSearch(treeData, search);
    const treeWithButtons = withButtons(
      treeWithSearch,
      {
        onAdd,
        onMove,
        onSort,
        onDelete,
        onPublish,
      },
      t,
    );
    return treeWithButtons;
  }, [treeData, search, onAdd, onMove, onSort, onDelete, onPublish, t]);

  const handleEditPage = (_: any, node: EventDataNode<DataNode>) => {
    onEdit(node);
  };

  return (
    <Tree
      className={className}
      treeData={mappedTreeData}
      selectedKeys={selectedKey ? [selectedKey] : []}
      onClick={handleEditPage}
      multiple
      expandedKeys={expandedKeys}
      onExpand={onExpand}
      autoExpandParent={autoExpandParent}
      blockNode
      defaultExpandAll
      showLine={{ showLeafIcon: <FileFilled /> }}
    />
  );
};

export default memo(PagesTree);
