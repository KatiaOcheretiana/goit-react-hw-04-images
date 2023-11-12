import { ButtonElement } from './Button.styled';

export const Button = ({ onClick }) => {
  return (
    <ButtonElement type="button" onClick={onClick}>
      Load more
    </ButtonElement>
  );
};
