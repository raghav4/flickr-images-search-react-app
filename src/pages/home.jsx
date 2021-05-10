/* eslint-disable no-lonely-if */
/* eslint-disable no-nested-ternary */
/* eslint-disable max-len */
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import InfiniteScroll from 'react-infinite-scroll-component';
import { AlertModal, CardGrid, SearchBox } from '../components';

const Home = () => {
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [progressLoader, setProgressLoader] = useState(true);
  const [isCustomSearch, setIsCustomSearch] = useState(false);
  const [customSearchTitle, setCustomSearchTitle] = useState('');
  const [infiniteLoaderDisplay, setInfiniteLoaderDisplay] = useState('flex');
  const [searchResultsTitle, setSearchResultsTitle] = useState('🆕 Showing Recent Images');

  const fetchImages = async (title = '', count = 20) => {
    setCurrentPage(currentPage + 1);
    setProgressLoader(true);
    const requestUrl = title ? `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=5adc0ef7be763da42ce94e17d0a3b3cf&text=${title}&page=${currentPage}&per_page=${count}&format=json&nojsoncallback=1` : `https://www.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=5adc0ef7be763da42ce94e17d0a3b3cf&page=${currentPage}&per_page=${count}&format=json&nojsoncallback=1`;
    try {
      const imagesData = await axios.get(requestUrl);
      const photos = imagesData.data.photos.photo;
      setSearchResultsTitle((photos && !photos.length && title) ? `No results found for the title "${title}"` : (title ? `Showing results for "${title}"` : '🆕 Showing Recent Images'));
      setInfiniteLoaderDisplay((photos && !photos.length && title) ? 'none' : 'flex');
      if (title === '') {
        if (isCustomSearch) {
          setIsCustomSearch(false);
          setImages(photos);
        } else {
          setImages([...images, ...photos]);
        }
      } else {
        if (isCustomSearch && title === customSearchTitle) {
          setImages([...images, ...photos]);
        } else {
          setImages(photos);
          setIsCustomSearch(true);
        }
      }
    } catch (ex) {
      AlertModal('Oops, Something failed', 'Please try again later!', 'error');
      // eslint-disable-next-line no-console
      console.log(ex);
    }
    setProgressLoader(false);
    setCustomSearchTitle(title);
  };

  useEffect(() => {
    AlertModal('DISCLAIMER: Viewer Discretion Advised', 'This project is using the Flickr API to show the images, however I found out that the images from the flickr API does not filter the explicit images. Please browse the images at your own risk.', 'warning');
    fetchImages();
  }, []);

  return (
    <>
      <SearchBox fetchCustomImages={fetchImages} searchResultsTitle={searchResultsTitle} />
      {progressLoader && <LinearProgress color="secondary" />}
      <InfiniteScroll
        dataLength={images}
        next={() => fetchImages(customSearchTitle, 20)}
        hasMore
        loader={(
          <img
            style={{ display: infiniteLoaderDisplay, objectFit: 'cover', margin: 'auto' }}
            className="img-fluid"
            src="https://i.imgur.com/UnziiKG.gif"
            alt="loading"
          />
        )}
        endMessage={(
          <p style={{ textAlign: 'center' }}>
            <b>Yay! You have browsed through all images.</b>
          </p>
        )}
      >
        <CardGrid images={images} />
      </InfiniteScroll>
    </>
  );
};

export default Home;
