import React from 'react';
import { Circles } from 'react-loader-spinner';

const Spinner = ({ message }) => {
  return (
    <div className='flex flex-col justify-center items-center w-full h-full fixed top-0 left-0 right-0 bottom-0 backdrop-blur-lg bg-opacity-60 bg-white'>
      <div className="bg-white p-5 rounded-md shadow-md">
        <Circles
          color="#00BFFF"
          height={50}
          width={50}
        />
        <p className="text-lg text-center mt-2 text-black font-bold">{message}</p>
      </div>
    </div>
  );
};

export default Spinner;
