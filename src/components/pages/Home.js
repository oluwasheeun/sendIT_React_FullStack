import React from 'react';

const Home = () => {

  // Transparent sticky menu background
  window.addEventListener('scroll', function () {
    if (window.scrollY > 50) {
      document.querySelector('#navbar').style.opacity = 0.9;
    } else {
      document.querySelector('#navbar').style.opacity = 1;
    }
  });

  return (
    <header id='showcase'>
      <div className='showcase-content'>
        <h1 className='l-heading'>Easy Home Delivery</h1>
        <p className='lead'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita
          perferendis officia architecto voluptate ipsam qui!
        </p>

        <a href='/register' className='btn'>
          Get Started
        </a>
      </div>
    </header>
  );
};

export default Home;