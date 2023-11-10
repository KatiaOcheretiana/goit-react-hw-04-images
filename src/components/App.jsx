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
    isLoad: false,
    error: false,
  };

  async componentDidUpdate(prevProps, prevState) {
    const { searchItem, page } = this.state;

    if (prevState.searchItem !== searchItem || prevState.page !== page) {
      try {
        this.setState({ isLoad: true, error: false });
        const cleanName = searchItem.split('/').pop();
        const imagesData = await searchByName(cleanName, page);
        this.setState(prevState => {
          return { images: [...prevState.images, ...imagesData] };
        });
        toast.success('Successfully found!');
      } catch (error) {
        this.setState({ error: true });
        toast.error('Nothing found. Check the correctness of the search word.');
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

    return (
      <div style={containerStyle}>
        <Searchbar onSubmit={this.onSubmitSearch} />
        {this.state.isLoad ? (
          <Loader />
        ) : (
          <ImageGallery items={this.state.images} />
        )}
        {this.state.images.length > 0 && <Button onClick={this.onLoadMore} />}
        <Toaster />
      </div>
    );
  }
}
