import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { searchByName } from 'helper/api-request';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import toast, { Toaster } from 'react-hot-toast';
import { nanoid } from 'nanoid';

export class App extends Component {
  state = {
    searchItem: '',
    randomId: 0,
    images: [],
    page: 1,
    perPage: 12,
    isLoad: false,
    error: false,
    availablePages: 0,
  };

  async componentDidUpdate(prevProps, prevState) {
    const { searchItem, page, perPage, randomId } = this.state;

    if (
      prevState.searchItem !== searchItem ||
      prevState.page !== page ||
      prevState.randomId !== randomId
    ) {
      try {
        this.setState({ isLoad: true, error: false });
        const imagesData = await searchByName(searchItem, page);

        if (imagesData.hits.length > 0) {
          this.setState(prevState => {
            return {
              images: [...prevState.images, ...imagesData.hits],
              availablePages: Math.ceil(imagesData.totalHits / perPage),
            };
          });
          toast.success('Successfully found!');
        } else {
          toast.error('Nothing found.');
        }
      } catch (error) {
        this.setState({ error: true });
      } finally {
        this.setState({ isLoad: false });
      }
    }
  }

  onSubmitSearch = searchName => {
    this.setState({
      searchItem: searchName,
      page: 1,
      images: [],
      randomId: nanoid(),
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
        {isLoad && <Loader />}
        {images.length > 0 && <ImageGallery items={images} />}
        {page !== availablePages && images.length !== 0 && (
          <Button onClick={this.onLoadMore} />
        )}
        <Toaster />
      </div>
    );
  }
}
