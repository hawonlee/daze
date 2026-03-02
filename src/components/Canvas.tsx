import { useState } from 'react';
import { useCanvasState, type CanvasItemData } from '../hooks/useCanvasState';
import CanvasItem from './CanvasItem';
import CreateModal from './CreateModal';
import ItemModal from './ItemModal';

const Canvas = () => {
  const { items, updateItem, bringToFront, addItem } = useCanvasState();
  const [selectedItem, setSelectedItem] = useState<CanvasItemData | null>(null);
  const [createAnchor, setCreateAnchor] = useState<{ x: number; y: number } | null>(null);

  const handleCanvasClick = (event: React.MouseEvent<HTMLElement>) => {
    if (event.target !== event.currentTarget) return;
    setSelectedItem(null);
    setCreateAnchor({ x: event.clientX, y: event.clientY });
  };

  return (
    <main className="relative h-screen w-screen overflow-hidden bg-canvas">
      <header className="pointer-events-none absolute left-6 top-6 z-40 rounded-2xl border border-violet-100 bg-white/80 px-4 py-3 backdrop-blur">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-violet-500">Daze</p>
        <h1 className="text-lg font-semibold text-slate-900">Infinite Idea Canvas</h1>
      </header>

      <section className="relative h-full w-full" onClick={handleCanvasClick}>
        {items.map((item) => (
          <CanvasItem
            key={item.id}
            item={item}
            selected={selectedItem?.id === item.id}
            onUpdate={updateItem}
            onBringToFront={bringToFront}
            onSelect={(next) => {
              bringToFront(next.id);
              setSelectedItem(next);
            }}
          />
        ))}
      </section>

      {selectedItem && <ItemModal item={selectedItem} onClose={() => setSelectedItem(null)} />}

      {createAnchor && (
        <CreateModal
          onClose={() => setCreateAnchor(null)}
          onCreate={({ type, content }) => {
            addItem({
              type,
              content,
              position: { x: createAnchor.x - 150, y: createAnchor.y - 90 },
              width: type === 'image' ? 280 : 260,
              height: type === 'image' ? 190 : 160
            });
          }}
        />
      )}
    </main>
  );
};

export default Canvas;
