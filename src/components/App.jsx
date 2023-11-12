import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { searchByName } from 'helper/api-request';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import toast, { Toaster } from 'react-hot-toast';

export class App extends Component {
  state = {
    searchItem: '',
    images: [],
    page: 1,
    perPage: 12,
    isLoad: false,
    error: false,
    availablePages: 0,
  };

  async componentDidUpdate(prevProps, prevState) {
    const { searchItem, page, perPage, availablePages } = this.state;

    if (prevState.searchItem !== searchItem || prevState.page !== page) {
      try {
        this.setState({ isLoad: true, error: false });
        const cleanName = searchItem.split('/').pop();
        const imagesData = await searchByName(cleanName, page);
        this.setState(prevState => {
          return {
            images: [...prevState.images, ...imagesData.hits],
            availablePages: Math.ceil(imagesData.totalHits / perPage),
          };
        });
      } catch (error) {
        this.setState({ error: true });
        if (availablePages === 0) {
          toast.error(
            'Nothing found. Check the correctness of the search word.'
          );
        }
      } finally {
        this.setState({ isLoad: false });
      }
    }
  }

  onSubmitSearch = e => {
    e.preventDefault();
    const searchName = e.target.elements.itemToSearch.value;
    this.setState({
      searchItem: `${Date.now()}/${searchName}`,
      page: 1,
      images: [],
    });
  };

  onLoadMore = () => {
    this.setState(prevState => {
      return { page: prevState.page + 1 };
    });
  };

  render() {
    const containerStyle = {
      display: 'grid',
      gridTemplateColumns: '1fr',
      gridGap: '16px',
      paddingBottom: '24px',
    };

    const { isLoad, images, error, page, availablePages } = this.state;

    return (
      <div style={containerStyle}>
        <Searchbar onSubmit={this.onSubmitSearch} />
        {error && (
          <b>Oops! Something went wrong! Please try reloading this page! 🥹</b>
        )}
        {isLoad ? <Loader /> : <ImageGallery items={images} />}
        {page !== availablePages && images.length !== 0 && (
          <Button onClick={this.onLoadMore} />
        )}
        <Toaster />
      </div>
    );
  }
}
