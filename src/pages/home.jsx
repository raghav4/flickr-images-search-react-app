/* eslint-disable no-console */
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import InfiniteScroll from 'react-infinite-scroll-component';
import { AlertModal, CardGrid, SearchBox } from '../components';

const Home = () => {
  const [images, setImages] = useState([]);
  // const [loaded, setLoaded] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [progressLoader, setProgressLoader] = useState(true);
  const [isCustomSearch, setIsCustomSearch] = useState(false);
  const [customSearchTitle, setCustomSearchTitle] = useState('');
  const [searchResultsTitle, setSearchResultsTitle] = useState('🆕 Showing Recent Images');

  const fetchImages = async (title = '', count = 20) => {
    setCurrentPage(currentPage + 1);
    // setLoaded(true);
    setProgressLoader(true);
    setCustomSearchTitle(title);
    const requestUrl = title ? `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=5adc0ef7be763da42ce94e17d0a3b3cf&text=${title}&page=${currentPage}&format=json&nojsoncallback=1` : `https://www.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=5adc0ef7be763da42ce94e17d0a3b3cf&page=${currentPage}&per_page=${count}&format=json&nojsoncallback=1`;
    setSearchResultsTitle(title ? `🔍 Showing search results for "${title}"` : '🆕 Showing Recent Images');
    try {
      const imagesData = await axios.get(requestUrl);
      const photos = imagesData.data.photos.photo;
      console.log('photos', photos);
      if (!title) {
        if (isCustomSearch) {
          setImages([...images, ...photos]);
        } else {
          setIsCustomSearch(true);
          setImages(photos);
        }
      } else {
        if (isCustomSearch) {
          setImages(photos);
        } else {
          setImages([...images, ...photos]);
        }
        setIsCustomSearch(false);
      }
      // setLoaded(false);
      setProgressLoader(false);
    } catch (ex) {
      console.log(ex);
    }
  };

  useEffect(() => {
    AlertModal('DISCLAIMER: Viewer Discretion Advised', 'This project is using the Flickr API to show the images, however I found out that the images from the flickr API does not filter the explicit images. Please browse the images only if you are ok doing so.', 'warning');
    fetchImages();
  }, []);

  return (
    <>
      <SearchBox fetchCustomImages={fetchImages} searchResultsTitle={searchResultsTitle} />
      {progressLoader && <LinearProgress color="secondary" />}
      {/* {loaded && (
        <h3 style={{
          textAlign: 'center', position: 'fixed', top: '50%', left: '33%',
        }}
        >
          Please wait, images are being loaded...
        </h3>
      )} */}
      <InfiniteScroll
        dataLength={images}
        next={() => fetchImages(customSearchTitle, 20)}
        hasMore
        // loader={(
        //   <img
        //     style={{ display: 'flex', objectFit: 'cover' }}
        //     src="https://i.imgur.com/Yj3tmln.gif"
        //     alt="loading"
        //   />
        // )}
      >
        <CardGrid images={images} />
      </InfiniteScroll>
    </>
  );
};

export default Home;
