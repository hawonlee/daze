import { useEffect, useRef, useState } from 'react';
import type { CanvasItemType } from '../hooks/useCanvasState';

type CreateModalProps = {
  onClose: () => void;
  onCreate: (payload: { type: CanvasItemType; content: string }) => void;
};

const focusable =
  'button, [href], input, textarea, select, [tabindex]:not([tabindex="-1"])';

const CreateModal = ({ onClose, onCreate }: CreateModalProps) => {
  const [type, setType] = useState<CanvasItemType>('text');
  const [textContent, setTextContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'Tab' && ref.current) {
        const nodes = Array.from(ref.current.querySelectorAll<HTMLElement>(focusable));
        if (nodes.length === 0) return;
        const first = nodes[0];
        const last = nodes[nodes.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener('keydown', onKeyDown);
    ref.current?.querySelector<HTMLElement>(focusable)?.focus();
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onClose]);

  const submit = () => {
    if (type === 'text' && textContent.trim()) {
      onCreate({ type: 'text', content: textContent.trim() });
      onClose();
    }
    if (type === 'image' && imageUrl.trim()) {
      onCreate({ type: 'image', content: imageUrl.trim() });
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1E1B4B]/30 p-6" onMouseDown={onClose}>
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-label="Create new canvas item"
        onMouseDown={(event) => event.stopPropagation()}
        className="w-full max-w-lg rounded-3xl border border-violet-100 bg-white p-6 shadow-soft animate-modal-in"
      >
        <div className="mb-6 flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-violet-500">Create New</p>
            <h2 className="text-xl font-semibold text-slate-900">Add an item to your canvas</h2>
          </div>
          <button className="rounded-full p-2 text-slate-500 hover:bg-violet-50" onClick={onClose} aria-label="Close modal">✕</button>
        </div>

        <div className="mb-4 flex gap-2 rounded-xl bg-violet-50 p-1">
          <button
            onClick={() => setType('text')}
            className={`flex-1 rounded-lg px-3 py-2 text-sm font-medium transition ${type === 'text' ? 'bg-white text-violet-700 shadow-sm' : 'text-slate-500 hover:text-violet-600'}`}
          >
            Text block
          </button>
          <button
            onClick={() => setType('image')}
            className={`flex-1 rounded-lg px-3 py-2 text-sm font-medium transition ${type === 'image' ? 'bg-white text-violet-700 shadow-sm' : 'text-slate-500 hover:text-violet-600'}`}
          >
            Image
          </button>
        </div>

        {type === 'text' ? (
          <textarea
            value={textContent}
            onChange={(event) => setTextContent(event.target.value)}
            className="h-32 w-full rounded-2xl border border-violet-200 p-3 text-sm outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
            placeholder="Write the text to place on the canvas"
          />
        ) : (
          <div className="space-y-3">
            <input
              value={imageUrl}
              onChange={(event) => setImageUrl(event.target.value)}
              className="w-full rounded-xl border border-violet-200 px-3 py-2 text-sm outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
              placeholder="Paste image URL (mock upload)"
            />
            <p className="text-xs text-slate-500">Mock upload mode: use any reachable image URL.</p>
          </div>
        )}

        <div className="mt-6 flex justify-end">
          <button onClick={submit} className="rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-500">
            Add to Canvas
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateModal;
