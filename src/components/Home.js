import React from 'react';

const Home = () => {
  return (
    // <div>
    // <p >
    //   Some of the must-visit places  </p>
    // </div>

    <div
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/canada_bg.jpg)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      <h1 style={{ color: 'white', fontSize: '3rem', marginBottom: '20px' }}>
        Canada's Beautiful Places
      </h1>
      <p style={{ color: 'white', fontSize: '1.2rem', textAlign: 'center', maxWidth: '800px' }}>
        Canada is a land of natural wonders and breathtaking landscapes. From the majestic
        Rocky Mountains to the stunning Niagara Falls, there is no shortage of beautiful
        places to explore. Whether you're a nature lover, an adventure enthusiast, or a
        history buff, Canada has something to offer for everyone.
      </p>
      <p style={{ color: 'white', fontSize: '1.2rem', textAlign: 'center', maxWidth: '800px' }}>
        Some of the must-visit places include Banff National Park, with its turquoise
        lakes and snow-capped peaks, the picturesque coastal towns of Nova Scotia, and the
        charming streets of Old Quebec City. Canada's natural beauty is unparalleled, and
        every province and territory has its unique gems waiting to be discovered.
      </p>
      <p style={{ color: 'white', fontSize: '1.2rem', textAlign: 'center', maxWidth: '800px' }}>
        We invite you to explore Canada's beautiful places and create unforgettable
        memories. If you have a favorite spot that you'd like to share with others, click
        on the "Introduce Place" link and tell us about it. Let's celebrate the wonders of
        Canada together!
      </p>
      <a
        href="https://example.com/introduce-place"
        style={{
          color: 'white',
          fontSize: '1.2rem',
          textDecoration: 'underline',
          marginTop: '20px',
        }}
      >
        Introduce Place
      </a>
    </div>
  );
};

export default Home;
