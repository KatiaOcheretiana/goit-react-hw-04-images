import ReactModal from 'react-modal';

ReactModal.setAppElement('#root');

const customStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    zIndex: 1200,
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    margin: '0 auto',
    transform: 'translate(-50%, -50%)',
    border: '0',
    padding: '0',
  },
};

export const Modal = ({ isModalOpen, closeModal, url, alt }) => {
  return (
    <ReactModal
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel={'Image Modal'}
    >
      <div>
        <div>
          <img src={url} alt={alt} />
        </div>
      </div>
    </ReactModal>
  );
};
