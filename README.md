# Daze

Daze is a React + TypeScript canvas app for arranging text and image cards, then querying mock AI suggestions from selected items.

## Run locally

```bash
npm install
npm run dev
```

Then open the local Vite URL shown in terminal.

## Architecture overview

- `src/components/Canvas.tsx`: top-level canvas surface, click routing, modal orchestration.
- `src/components/CanvasItem.tsx`: absolutely positioned canvas nodes with drag + resize wiring.
- `src/components/ResizableWrapper.tsx`: resize-handle abstraction and resize state gating.
- `src/components/ItemModal.tsx`: “Ask Daze from Item” dialog with focus trap + mock response.
- `src/components/CreateModal.tsx`: “Create New” dialog for adding text or image items.
- `src/hooks/useCanvasState.ts`: canonical item state (id, type, position, width, height, content, zIndex).
- `src/hooks/useDrag.ts` and `src/hooks/useResize.ts`: pointer interaction logic.

## Plugging in a real AI API later

Today `ItemModal` generates a local mock response in `handleAsk`. To connect a real AI backend:

1. Replace `handleAsk` with an async API call.
2. Add loading + error states around the request.
3. Move model interaction to a service module (for example `src/services/aiClient.ts`) so the modal stays presentational.
4. Keep the same input/output shape to avoid UI rewrites.
