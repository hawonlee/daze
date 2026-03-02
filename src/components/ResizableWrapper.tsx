import type { PropsWithChildren } from 'react';
import { useResize } from '../hooks/useResize';

type ResizableWrapperProps = PropsWithChildren<{
  width: number;
  height: number;
  selected: boolean;
  onResize: (size: { width: number; height: number }) => void;
  onResizeStateChange: (isResizing: boolean) => void;
}>;

const ResizableWrapper = ({
  children,
  width,
  height,
  selected,
  onResize,
  onResizeStateChange
}: ResizableWrapperProps) => {
  const { startResize } = useResize({
    width,
    height,
    onResize,
    onResizeStart: () => onResizeStateChange(true),
    onResizeEnd: () => onResizeStateChange(false)
  });

  return (
    <div className="relative h-full w-full">
      {children}
      <button
        className={`absolute -bottom-2 -right-2 h-4 w-4 cursor-se-resize rounded-full border-2 border-white bg-violet-500 shadow transition ${selected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
        onMouseDown={startResize}
        aria-label="Resize item"
      />
    </div>
  );
};

export default ResizableWrapper;
