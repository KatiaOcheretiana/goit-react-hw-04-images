import { Modal } from 'components/Modal/Modal';
import { GalleryItem } from './ImageGalleryItem.styled';
import { Component } from 'react';

export class ImageGalleryItem extends Component {
  state = {
    isModalOpen: false,
  };

  toggleStateOfModal = () => {
    this.setState({ isModalOpen: !this.state.isModalOpen });
  };

  render() {
    const { webformatURL, largeImageURL, tags } = this.props;
    const { isModalOpen } = this.state;
    return (
      <GalleryItem>
        <img src={webformatURL} alt={tags} onClick={this.toggleStateOfModal} />
        <Modal
          url={largeImageURL}
          isModalOpen={isModalOpen}
          toggleStateOfModal={this.toggleStateOfModal}
          alt={tags}
        />
      </GalleryItem>
    );
  }
}
