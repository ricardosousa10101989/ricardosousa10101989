import NextImage from 'next/image';

const thresholds = [
  [ 480, 30 ],
  [ 768, 35 ],
  [ 1080, 40 ],
  [ 1280, 45 ],
  [ 1440, 50 ],
  [ 1920, 55 ],
  [ 2560, 60 ],
];

const getQuality = width => {
  const quality = thresholds.find(([ w ]) => width <= w)?.[1];
  return quality || 75;
};

const loader = ({ quality, src, width }) => {
  const base = '/_next/image';
  const url = encodeURIComponent(src);
  const q = quality || getQuality(width);
  return `${base}?url=${url}&w=${width}&q=${q}`;
};

const Image = ({
  alt, pure, src, ...props
}) => {
  const realSrc = src?.src || src;

  if (!realSrc) {
    return null;
  }

  if (pure || realSrc.endsWith('.svg')) {
    return (
      <img
        alt={ alt }
        src={ realSrc }
        { ...props }
      />
    );
  }

  return (
    <NextImage
      alt={ alt }
      fill
      loader={ loader }
      src={ src }
      { ...props }
    />
  );
};

Image.defaultProps = {
  alt: '',
};

export default Image;
