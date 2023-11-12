import { Modal } from 'components/Modal/Modal';
import { GalleryItem } from './ImageGalleryItem.styled';
import { Component } from 'react';

export class ImageGalleryItem extends Component {
  state = {
    isModalOpen: false,
  };

  openModal = () => {
    this.setState({ isModalOpen: true });
  };

  closeModal = () => {
    this.setState({ isModalOpen: false });
  };

  render() {
    const { webformatURL, largeImageURL, tags } = this.props;
    const { isModalOpen } = this.state;
    return (
      <GalleryItem>
        <img src={webformatURL} alt={tags} onClick={this.openModal} />
        <Modal
          url={largeImageURL}
          isModalOpen={isModalOpen}
          closeModal={this.closeModal}
          alt={tags}
        />
      </GalleryItem>
    );
  }
}
