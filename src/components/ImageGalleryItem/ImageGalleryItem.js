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

// export class ImageGalleryItem extends Component {
//   state = {
//     isModalOpen: false,
//   };

//   toggleStateOfModal = () => {
//     this.setState({ isModalOpen: !this.state.isModalOpen });
//   };

//   render() {
//     const { webformatURL, largeImageURL, tags } = this.props;
//     const { isModalOpen } = this.state;
//     return (
//       <GalleryItem>
//         <img src={webformatURL} alt={tags} onClick={this.toggleStateOfModal} />
//         <Modal
//           url={largeImageURL}
//           isModalOpen={isModalOpen}
//           toggleStateOfModal={this.toggleStateOfModal}
//           alt={tags}
//         />
//       </GalleryItem>
//     );
//   }
// }
