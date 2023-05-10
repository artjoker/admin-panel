import React, { memo } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import { SortableItemRenderOptions } from './types';

interface Props {
  id: string;
  render: (options: SortableItemRenderOptions) => React.ReactNode;
}

const SortableItem = ({ id, render }: Props) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return <>{render({ attributes, listeners, setNodeRef, style })}</>;
};

export default memo(SortableItem);
