import { useState, useEffect } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { searchByName } from 'helper/api-request';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import toast, { Toaster } from 'react-hot-toast';
import { nanoid } from 'nanoid';

export const App = () => {
  const [searchItem, setSearchItem] = useState('');
  const [randomId, setRandomId] = useState(0);
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoad, setIsLoad] = useState(false);
  const [error, setError] = useState(false);
  const [availablePages, setAvailablePages] = useState(0);
  const perPage = 12;

  useEffect(() => {
    const fetchData = async () => {
      if (searchItem === '') {
        return;
      }

      try {
        setError(false);
        setIsLoad(true);
        const imagesData = await searchByName(searchItem, page);

        if (imagesData.hits.length > 0) {
          setImages(prev => [...prev, ...imagesData.hits]);
          setAvailablePages(Math.ceil(imagesData.totalHits / perPage));
          toast.success('Successfully found!');
        } else {
          toast.error('Nothing found.');
        }
      } catch (error) {
        setError(true);
      } finally {
        setIsLoad(false);
      }
    };
    fetchData();
  }, [searchItem, page, randomId]);

  const onSubmitSearch = searchName => {
    setSearchItem(searchName);
    setPage(1);
    setImages([]);
    setRandomId(nanoid());
  };

  const onLoadMore = () => {
    setPage(prev => prev + 1);
  };

  const containerStyle = {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gridGap: '16px',
    paddingBottom: '24px',
  };

  return (
    <div style={containerStyle}>
      <Searchbar onSubmit={onSubmitSearch} />
      {error && (
        <b>Oops! Something went wrong! Please try reloading this page! 🥹</b>
      )}
      {isLoad && <Loader />}
      {images.length > 0 && <ImageGallery items={images} />}
      {page !== availablePages && images.length !== 0 && (
        <Button onClick={onLoadMore} />
      )}
      <Toaster />
    </div>
  );
};

// export class App extend Component {
//   state = {
//     searchItem: '',
//     randomId: 0,
//     images: [],
//     page: 1,
//     perPage: 12,
//     isLoad: false,
//     error: false,
//     availablePages: 0,
//   };

//   async componentDidUpdate(prevProps, prevState) {
//     const { searchItem, page, perPage, randomId } = this.state;

//     if (
//       prevState.searchItem !== searchItem ||
//       prevState.page !== page ||
//       prevState.randomId !== randomId
//     ) {
//       try {
//         this.setState({ isLoad: true, error: false });
//         const imagesData = await searchByName(searchItem, page);

//         if (imagesData.hits.length > 0) {
//           this.setState(prevState => {
//             return {
//               images: [...prevState.images, ...imagesData.hits],
//               availablePages: Math.ceil(imagesData.totalHits / perPage),
//             };
//           });
//           toast.success('Successfully found!');
//         } else {
//           toast.error('Nothing found.');
//         }
//       } catch (error) {
//         this.setState({ error: true });
//       } finally {
//         this.setState({ isLoad: false });
//       }
//     }
//   }

//   onSubmitSearch = searchName => {
//     this.setState({
//       searchItem: searchName,
//       page: 1,
//       images: [],
//       randomId: nanoid(),
//     });
//   };

//   onLoadMore = () => {
//     this.setState(prevState => {
//       return { page: prevState.page + 1 };
//     });
//   };

//   render() {
//     const containerStyle = {
//       display: 'grid',
//       gridTemplateColumns: '1fr',
//       gridGap: '16px',
//       paddingBottom: '24px',
//     };

//     const { isLoad, images, error, page, availablePages } = this.state;

//     return (
//       <div style={containerStyle}>
//         <Searchbar onSubmit={this.onSubmitSearch} />
//         {error && (
//           <b>Oops! Something went wrong! Please try reloading this page! 🥹</b>
//         )}
//         {isLoad && <Loader />}
//         {images.length > 0 && <ImageGallery items={images} />}
//         {page !== availablePages && images.length !== 0 && (
//           <Button onClick={this.onLoadMore} />
//         )}
//         <Toaster />
//       </div>
//     );
//   }
// }
