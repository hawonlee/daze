type TextItemProps = {
  content: string;
};

const TextItem = ({ content }: TextItemProps) => {
  return (
    <div className="h-full w-full rounded-2xl border border-violet-100 bg-white p-4 text-sm leading-relaxed text-slate-700 shadow-sm">
      {content}
    </div>
  );
};

export default TextItem;
