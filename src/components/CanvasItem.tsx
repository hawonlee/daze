import { useState } from 'react';
import type { CanvasItemData } from '../hooks/useCanvasState';
import { useDrag } from '../hooks/useDrag';
import ImageItem from './ImageItem';
import ResizableWrapper from './ResizableWrapper';
import TextItem from './TextItem';

type CanvasItemProps = {
  item: CanvasItemData;
  selected: boolean;
  onUpdate: (id: string, updates: Partial<CanvasItemData>) => void;
  onSelect: (item: CanvasItemData) => void;
  onBringToFront: (id: string) => void;
};

const CanvasItem = ({ item, selected, onUpdate, onSelect, onBringToFront }: CanvasItemProps) => {
  const [isResizing, setIsResizing] = useState(false);

  const { onMouseDown } = useDrag({
    x: item.position.x,
    y: item.position.y,
    disabled: isResizing,
    onDragStart: () => onBringToFront(item.id),
    onDrag: (position) => onUpdate(item.id, { position })
  });

  return (
    <article
      className={`group absolute transition-shadow ${selected ? 'shadow-soft' : 'hover:shadow-lg'}`}
      style={{
        transform: `translate(${item.position.x}px, ${item.position.y}px)`,
        width: item.width,
        height: item.height,
        zIndex: item.zIndex
      }}
      onMouseDown={onMouseDown}
      onClick={(event) => {
        event.stopPropagation();
        onSelect(item);
      }}
    >
      <ResizableWrapper
        selected={selected || !isResizing}
        width={item.width}
        height={item.height}
        onResize={(size) => onUpdate(item.id, size)}
        onResizeStateChange={setIsResizing}
      >
        {item.type === 'image' ? <ImageItem content={item.content} /> : <TextItem content={item.content} />}
      </ResizableWrapper>
    </article>
  );
};

export default CanvasItem;
