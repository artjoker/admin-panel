import { useSortable } from '@dnd-kit/sortable';

type UseSortableResult = ReturnType<typeof useSortable>;

export interface SortableItemRenderOptions {
  attributes: UseSortableResult['attributes'];
  listeners: UseSortableResult['listeners'];
  setNodeRef: UseSortableResult['setNodeRef'];
  style: { transform?: string; transition?: string };
}
