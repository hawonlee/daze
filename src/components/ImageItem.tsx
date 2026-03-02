type ImageItemProps = {
  content: string;
};

const ImageItem = ({ content }: ImageItemProps) => {
  return <img src={content} alt="Canvas" className="h-full w-full rounded-2xl object-cover" draggable={false} />;
};

export default ImageItem;
