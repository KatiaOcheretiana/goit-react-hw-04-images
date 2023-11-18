import { Modal } from 'components/Modal/Modal';
import { GalleryItem } from './ImageGalleryItem.styled';
import { useState } from 'react';

export const ImageGalleryItem = ({ webformatURL, largeImageURL, tags }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleStateOfModal = () => {
    setIsModalOpen(prev => !prev);
  };

  return (
    <GalleryItem>
      <img src={webformatURL} alt={tags} onClick={toggleStateOfModal} />
      <Modal
        url={largeImageURL}
        isModalOpen={isModalOpen}
        toggleStateOfModal={toggleStateOfModal}
        alt={tags}
      />
    </GalleryItem>
  );
};
