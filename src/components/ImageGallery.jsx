import { useState } from "react";

function ImageGallery({ images }) {
  const [main, setMain] = useState(images[0]);

  return (
    <div>
      <img src={img} alt={`Photo of property bedroom`} />
      <div>
        {images.map((img, i) => (
          <img key={i} src={img} width="80" onClick={() => setMain(img)} />
        ))}
      </div>
    </div>
  );
}

export default ImageGallery;
