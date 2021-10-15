import React, { useState } from 'react';
import Image from 'next/image';

const ImageFallback = (props) => {
    
    const { src, fallbackSrc, ...rest } = props;
    const imageCheck = src? true : false;
    console.log(imageCheck)

    const myLoader = ({ src, width, quality }) => {
        return `${imageCheck?src:fallbackSrc}?w=${width}&q=${quality || 75}`
      }

    return (
        <Image
            {...rest}
            placeholder="blur"
            blurDataURL
            loader={myLoader}
            src={imageCheck?src:fallbackSrc}
            onError={() => {
                setImgSrc(fallbackSrc);
            }}
        />
    );
};

export default ImageFallback;