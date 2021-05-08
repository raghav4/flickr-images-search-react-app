/* eslint-disable no-console */
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { CardGrid, SearchBox } from '../components';

const Home = () => {
  const [images, setImages] = useState([]);
  const [loaded, setLoaded] = useState(true);

  const fetchImagesSuggestions = async () => {
    try {
      const imagesData = await axios.get('https://www.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=5adc0ef7be763da42ce94e17d0a3b3cf&format=json&nojsoncallback=1');
      const photos = imagesData.data.photos.photo;
      console.log('Fetching Images...');
      console.log(photos);
      setImages(photos);
      setLoaded(false);
    } catch (ex) {
      console.log(ex);
    }
  };

  useEffect(() => {
    fetchImagesSuggestions();
  }, []);

  return (
    <>
      <SearchBox />
      {loaded && (
      <h3 style={{
        textAlign: 'center', position: 'fixed', top: '50%', left: '33%',
      }}
      >
        Please wait, images are being loaded...
      </h3>
      )}
      <CardGrid images={images} />
    </>
  );
};

export default Home;
