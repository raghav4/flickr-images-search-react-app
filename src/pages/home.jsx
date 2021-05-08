/* eslint-disable no-console */
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import { CardGrid, SearchBox } from '../components';

const Home = () => {
  const [images, setImages] = useState([]);
  const [loaded, setLoaded] = useState(true);
  const [searchResultsTitle, setSearchResultsTitle] = useState('🆕 Showing Recent Images');

  const fetchImages = async (title = '') => {
    setLoaded(true);
    const requestUrl = title ? `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=5adc0ef7be763da42ce94e17d0a3b3cf&text=${title}&page=20&format=json&nojsoncallback=1` : 'https://www.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=5adc0ef7be763da42ce94e17d0a3b3cf&format=json&nojsoncallback=1';
    setSearchResultsTitle(title ? `Showing search results for "${title}"` : '🆕 Showing Recent Images');
    try {
      const imagesData = await axios.get(requestUrl);
      const photos = imagesData.data.photos.photo;
      // console.log('Fetched Images...', photos);
      setImages(photos);
      setLoaded(false);
    } catch (ex) {
      console.log(ex);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <>
      <SearchBox fetchCustomImages={fetchImages} />
      {loaded && (
      <>
        <LinearProgress color="secondary" />
        <h3 style={{
          textAlign: 'center', position: 'fixed', top: '50%', left: '33%',
        }}
        >
          Please wait, images are being loaded...
        </h3>
      </>
      )}
      <h4 className="my-3" style={{ textAlign: 'center' }}>{searchResultsTitle}</h4>
      <CardGrid images={images} />
    </>
  );
};

export default Home;
