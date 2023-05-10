import { memo } from 'react';
import { Tree } from 'antd';
import type { DataNode, EventDataNode } from 'antd/es/tree';

import { FileFilled } from '@ant-design/icons';

interface IPagesTreeProps {
  className?: string;
  treeData: DataNode[];
  onSelect: (node: DataNode) => void;
}

const PageSelect = ({ className, treeData, onSelect }: IPagesTreeProps) => {
  const handleSelectPage: (
    _: any | undefined,
    node: EventDataNode<DataNode>,
  ) => void = (node, _) => {
    if (node.disabled) {
      return;
    }
    onSelect(node);
  };

  return (
    <Tree
      className={className}
      treeData={treeData}
      onClick={handleSelectPage}
      defaultExpandAll
      selectable={false}
      showLine={{ showLeafIcon: <FileFilled /> }}
    />
  );
};

export default memo(PageSelect);
