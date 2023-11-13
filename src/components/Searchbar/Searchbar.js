import {
  SearcInput,
  SearchBtn,
  SearchField,
  SearchForm,
} from './Searchbar.styled';
import { FcCameraIdentification } from 'react-icons/fc';

export const Searchbar = ({ onSubmit }) => {
  return (
    <SearchField>
      <SearchForm
        onSubmit={e => {
          e.preventDefault();
          const searchName = e.target.elements.itemToSearch.value;
          onSubmit(searchName);
        }}
      >
        <SearchBtn type="submit">
          <span>
            <FcCameraIdentification size="30" />
          </span>
        </SearchBtn>

        <SearcInput
          name="itemToSearch"
          required
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </SearchForm>
    </SearchField>
  );
};
