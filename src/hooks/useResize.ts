import type { MouseEvent as ReactMouseEvent } from 'react';
import { useRef } from 'react';

type ResizeConfig = {
  width: number;
  height: number;
  minWidth?: number;
  minHeight?: number;
  onResize: (size: { width: number; height: number }) => void;
  onResizeStart?: () => void;
  onResizeEnd?: () => void;
};

export const useResize = ({
  width,
  height,
  minWidth = 120,
  minHeight = 80,
  onResize,
  onResizeStart,
  onResizeEnd
}: ResizeConfig) => {
  const startMouse = useRef({ x: 0, y: 0 });
  const startSize = useRef({ width: 0, height: 0 });

  const startResize = (event: ReactMouseEvent<HTMLElement>) => {
    event.preventDefault();
    event.stopPropagation();

    startMouse.current = { x: event.clientX, y: event.clientY };
    startSize.current = { width, height };
    onResizeStart?.();

    const onMouseMove = (moveEvent: MouseEvent) => {
      const nextWidth = Math.max(minWidth, startSize.current.width + moveEvent.clientX - startMouse.current.x);
      const nextHeight = Math.max(minHeight, startSize.current.height + moveEvent.clientY - startMouse.current.y);
      onResize({ width: nextWidth, height: nextHeight });
    };

    const onMouseUp = () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      onResizeEnd?.();
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  };

  return { startResize };
};
