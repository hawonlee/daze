import { useEffect, useRef, useState } from 'react';
import type { CanvasItemData } from '../hooks/useCanvasState';

type ItemModalProps = {
  item: CanvasItemData;
  onClose: () => void;
};

const focusable =
  'button, [href], input, textarea, select, [tabindex]:not([tabindex="-1"])';

const ItemModal = ({ item, onClose }: ItemModalProps) => {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
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
    const first = ref.current?.querySelector<HTMLElement>(focusable);
    first?.focus();

    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onClose]);

  const handleAsk = () => {
    if (!question.trim()) return;
    setResponse(`Daze insight: ${question.slice(0, 90)} — prioritize impact, then ship a concise prototype for feedback.`);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#1E1B4B]/30 p-6"
      onMouseDown={onClose}
      role="presentation"
    >
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-label="Ask Daze from selected item"
        className="w-full max-w-xl rounded-3xl border border-violet-100 bg-white p-6 shadow-soft transition-all duration-200 animate-modal-in"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-violet-500">Ask Daze from Item</p>
            <h2 className="text-xl font-semibold text-slate-900">Generate context-aware suggestion</h2>
          </div>
          <button className="rounded-full p-2 text-slate-500 hover:bg-violet-50" onClick={onClose} aria-label="Close modal">✕</button>
        </div>

        <div className="mb-5 overflow-hidden rounded-2xl border border-violet-100 bg-softBg">
          {item.type === 'image' ? (
            <img src={item.content} alt="Selected canvas item" className="h-40 w-full object-cover" />
          ) : (
            <p className="p-4 text-slate-700">{item.content}</p>
          )}
        </div>

        <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="item-question">Your prompt</label>
        <textarea
          id="item-question"
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
          className="h-28 w-full rounded-2xl border border-violet-200 p-3 text-sm outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
          placeholder="Ask Daze to summarize, rewrite, or extract insights..."
        />

        <div className="mt-5 flex justify-end">
          <button
            onClick={handleAsk}
            className="rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-500"
          >
            Ask Daze
          </button>
        </div>

        {response && <p className="mt-4 rounded-xl bg-violet-50 p-3 text-sm text-violet-900">{response}</p>}
      </div>
    </div>
  );
};

export default ItemModal;
