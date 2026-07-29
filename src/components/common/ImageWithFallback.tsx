import { useState } from "react";

type Props = {
  src: string;
  alt: string;
  className?: string;
};

const ImageWithFallback = ({ src, alt, className }: Props) => {
  const [error, setError] = useState(false);

  return (
    <img
      src={error ? "https://placehold.co/600x400?text=No+Image" : src}
      alt={alt}
      className={className}
      onError={() => setError(true)}
      loading="lazy"
    />
  );
};

export default ImageWithFallback;
