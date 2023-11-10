import { ButtonElement } from './Button.styled';

export const Button = ({ onClick }) => {
  return <ButtonElement onClick={onClick}>Load more</ButtonElement>;
};
