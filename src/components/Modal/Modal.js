import ReactModal from 'react-modal';

ReactModal.setAppElement('#root');

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    margin: '0 auto',
    transform: 'translate(-50%, -50%)',
  },
};

export const Modal = ({ isModalOpen, closeModal, url }) => {
  return (
    <ReactModal
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Image Modal"
    >
      <div>
        <div>
          <img src={url} alt="The large view of request" />
        </div>
      </div>
    </ReactModal>
  );
};
