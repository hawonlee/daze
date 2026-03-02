import { useState } from 'react';

export type CanvasItemType = 'image' | 'text';

export type CanvasItemData = {
  id: string;
  type: CanvasItemType;
  position: { x: number; y: number };
  width: number;
  height: number;
  content: string;
  zIndex: number;
};

const initialItems: CanvasItemData[] = [
  {
    id: 'intro-text',
    type: 'text',
    position: { x: 110, y: 110 },
    width: 280,
    height: 170,
    content: 'Plan onboarding flow improvements and ask Daze to summarize next actions.',
    zIndex: 1
  },
  {
    id: 'sample-image',
    type: 'image',
    position: { x: 460, y: 220 },
    width: 290,
    height: 210,
    content:
      'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80',
    zIndex: 2
  }
];

export const useCanvasState = () => {
  const [items, setItems] = useState<CanvasItemData[]>(initialItems);

  const updateItem = (id: string, updates: Partial<CanvasItemData>) => {
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, ...updates } : item)));
  };

  const bringToFront = (id: string) => {
    setItems((prev) => {
      const highest = prev.reduce((max, item) => Math.max(max, item.zIndex), 0);
      return prev.map((item) => (item.id === id ? { ...item, zIndex: highest + 1 } : item));
    });
  };

  const addItem = (newItem: Omit<CanvasItemData, 'id' | 'zIndex'>) => {
    const id = `item-${crypto.randomUUID().slice(0, 8)}`;
    setItems((prev) => {
      const highest = prev.reduce((max, item) => Math.max(max, item.zIndex), 0);
      return [...prev, { ...newItem, id, zIndex: highest + 1 }];
    });
  };

  return { items, updateItem, bringToFront, addItem };
};
