import React, { useCallback, useState } from 'react';

import style from '../../styles/css/postImage.module.css';

const PostImages = ({ images }) => {
  const [imageCuurrentNo, setImageCuurrentNo] = useState(0);

  const onClickLeft = useCallback(() => {
    if (imageCuurrentNo > 0) {
      setImageCuurrentNo((prev) => prev - 1);
    }
  }, [imageCuurrentNo]);
  const onClickRight = useCallback(() => {
    if (imageCuurrentNo < images.length - 1) {
      setImageCuurrentNo((prev) => prev + 1);
    }
  }, [imageCuurrentNo]);

  return (
    <>
      <div className={style.imageBox}>
        <div className={style.left} onClick={onClickLeft}>
          <img src="/icon/left.png" />
        </div>
        <div className={style.right} onClick={onClickRight}>
          <img src="/icon/right.png" />
        </div>
        {images.map((v, i) => {
          return (
            <img
              src={v.src}
              style={{
                transform: `translate3d(-${imageCuurrentNo * 100}%, 0px, 0px)`,
              }}
            />
          );
        })}
        <span>{`${imageCuurrentNo + 1} / ${images.length}`}</span>
      </div>
    </>
  );
};

export default PostImages;