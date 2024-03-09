import React, { useState, useEffect } from 'react';
import axios from 'axios';


const Homepage = () => {
  const [backgroundImage, setBackgroundImage] = useState('');
  const [searchText, setSearchText] = useState("") 
  const [result, setResult] = useState([])

  const changePhoto = () =>{
axios.get(`https://api.unsplash.com/search/photos?page=1&query=${searchText}&client_id=iu18PfeqcFbHUx8wzNEBfgnszAk17seUX8_Q6BoB1Ck`).then((response)=>{
  console.log(response)
  setResult(response.data.results);
})
  }

  useEffect(() => {
    const fetchRandomImage = async () => {
      try {
        const response = await axios.get('https://api.unsplash.com/photos/random', {
          params: {
            client_id: 'uV_XfBR-7Qir_lUymDZg9qspjc0PrNhv55d-veEb228',
            query: 'landscape', 
          },
        });
        setBackgroundImage(response.data.urls.regular);
      } catch (error) {
        console.error('Error fetching random image:', error);
      }
    };

    fetchRandomImage();
  }, []);

  return (
    <div
      className="bg-cover bg-center h-screen flex"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >    
     <div className=''>
    <h1 className=' text-2xl m-4 font-bold'>Image Gallery</h1>
       <input
            type="text"
            className="border border-solid border-black m-2"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
            <button
            className="px-4 py-2 bg-green-100 m-4 rounded-lg" type='submit'
            onClick={changePhoto}
          >
            Search
          </button>
          </div>
          <div className='mt-28'>
          <div className="container mx-auto sm:px-4 ">
<div className='flex flex-wrap  text-centre text-lg-start'>
  {result.map((value) => {
      return (
        <div className='lg:w-1/4 pr-4 pl-4 relative flex-grow max-w-full flex-1 px-4 md-4 w-1/2'>
          <a href='/' className='block mb-4 h-full'>
<img className=' w-96 ' alt='' src={value.urls.small}/>
</a>
          </div>
      )
  })}
</div>
          </div>
          </div>
          </div>
  );
};

export default Homepage;
