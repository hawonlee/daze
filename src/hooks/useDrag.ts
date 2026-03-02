import type { MouseEvent as ReactMouseEvent } from 'react';
import { useRef } from 'react';

type DragConfig = {
  x: number;
  y: number;
  onDrag: (position: { x: number; y: number }) => void;
  onDragStart?: () => void;
  onDragEnd?: () => void;
  disabled?: boolean;
};

export const useDrag = ({ x, y, onDrag, onDragStart, onDragEnd, disabled }: DragConfig) => {
  const startMouse = useRef({ x: 0, y: 0 });
  const startPos = useRef({ x: 0, y: 0 });

  const onMouseDown = (event: ReactMouseEvent<HTMLElement>) => {
    if (disabled || event.button !== 0) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();
    startMouse.current = { x: event.clientX, y: event.clientY };
    startPos.current = { x, y };
    onDragStart?.();

    const onMouseMove = (moveEvent: MouseEvent) => {
      const deltaX = moveEvent.clientX - startMouse.current.x;
      const deltaY = moveEvent.clientY - startMouse.current.y;
      onDrag({ x: startPos.current.x + deltaX, y: startPos.current.y + deltaY });
    };

    const onMouseUp = () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      onDragEnd?.();
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  };

  return { onMouseDown };
};
