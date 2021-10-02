import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';

import style from '../../styles/css/dynamicComment.module.css';
import CommentsToReply from './CommentsToReply';

import { useDispatch, useSelector } from 'react-redux';
import { COMMENT_TO_REPLY_OPEN } from '../../reducers/menu';

import CommentOptionBtn from './CommentOptionBtn';

const Comment = ({ mainPosts, id }) => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);

  const [userId, setUserId] = useState(null);
  const [nickname, setNickname] = useState(null);

  useEffect(() => {
    if (!me) {
      Router.push('/');
    }
  }, [me]);

  const onClick = useCallback(
    (v) => () => {
      setUserId(v.id);
      setNickname(v.nickname);
      dispatch({
        type: COMMENT_TO_REPLY_OPEN,
      });
    },
    [userId, nickname],
  );

  return (
    <div>
      {mainPosts?.Comments.map((v, i) => {
        return (
          <ul key={v.User.nickname}>
            <li>
              <div>
                <div
                  className={style.userIcon}
                  // style={{
                  //   background: 'url(/icon/profle_img.png) ',
                  //   backgroundSize: 'contain',
                  // }}
                >
                  {v.User.nickname[0]}
                </div>
              </div>

              <div className={style.contentInComment}>
                <span>{v.User.nickname}</span>
                <span>{v.content}</span>
                {/* <span
                  style={{
                    backgroundImage: 'url(/icon/btn.svg)',
                    cursor: 'pointer',
                  }}
                >
                  <img />
                </span> */}
                <span>
                  <CommentOptionBtn post={v} postId={id} bool={true} />
                </span>
              </div>
            </li>

            <div className={style.timeAndReply}>
              <div>
                <p>시간</p>
              </div>
              <div>
                <button style={{ marginTop: -20 }} onClick={onClick(v.User)}>
                  답글 달기
                </button>
              </div>
            </div>

            <li className={style.reply}>
              <CommentsToReply
                v={v}
                i={i}
                userId={userId}
                nickname={nickname}
                id={id}
              />
            </li>
          </ul>
        );
      })}
    </div>
  );
};

Comment.propTypes = {
  mainPosts: PropTypes.shape({
    id: PropTypes.number,
    user: PropTypes.object,
    content: PropTypes.string,
    createdAt: PropTypes.string,
    comments: PropTypes.arrayOf(PropTypes.object),
    Images: PropTypes.arrayOf(PropTypes.object),
    Likers: PropTypes.arrayOf(PropTypes.object),
    Retweet: PropTypes.objectOf(PropTypes.any),
  }).isRequired,
};

export default Comment;