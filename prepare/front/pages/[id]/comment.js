//post/[id]/comment.js
import React, { useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useDispatch, useSelector } from 'react-redux';

import useInput from '../../hooks/useInput';

import MobileComment from '../../components/comment/MobileComment';
import MainLayout from '../../components/MainLayout';

const Post = () => {
  const router = useRouter();
  const { id } = router.query;

  let windowScreenWidth = null;
  if (typeof window !== 'undefined') {
    windowScreenWidth = window.screen.width;
  }
  // const windowScreenWidth = window.screen.width;

  const dispatch = useDispatch();
  const { mainPosts } = useSelector((state) => state.post);

  return (
    // <MainLayout>
    <>
      <Head>
        <title>
          {mainPosts[id]?.User.nickname}
          님의 글
        </title>
        <meta
          name="description"
          content={`${mainPosts[id]?.User.nickname}님의 게시글`}
        />
        <meta
          property="og:title"
          content={`${mainPosts[id]?.User.nickname}님의 게시글`}
        />
        <meta
          property="og:description"
          content={`${mainPosts[id]?.User.nickname}님의 게시글`}
        />
        <meta property="og:image" content="https://nodebird.com/favicon.ico" />
        <meta property="og:url" content={`https://nodebird.com/user/${id}`} />
      </Head>

      {windowScreenWidth > 767 ? (
        // 767이상일떄 화면
        <div>ss</div>
      ) : (
        // 767이하일떄 화면
        <MobileComment id={id} />
      )}
    </>
    // </MainLayout>
  );
};

export default Post;