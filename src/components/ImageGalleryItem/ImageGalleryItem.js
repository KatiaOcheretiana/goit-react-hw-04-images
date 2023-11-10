import { GalleryItem } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ webformatURL, largeImageURL }) => {
  return (
    <GalleryItem>
      <img src={webformatURL} alt="Image by your request" />
    </GalleryItem>
  );
};
