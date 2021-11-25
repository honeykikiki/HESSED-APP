import React, { useRef, useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import style from '../../styles/css/dynamicComment.module.css';
import useInput from '../../hooks/useInput';

import { useDispatch, useSelector } from 'react-redux';
import { ADD_COMMENT_REPLY_REQUEST } from '../../reducers/post';
import { COMMENT_TO_REPLY_CLOSE } from '../../reducers/menu';

import CommentOptionBtn from './CommentOptionBtn';

const CommentsToReply = ({
  v,
  userId,
  nickname,
  commentId,
  onClickOption,
  post,
}) => {
  const dispatch = useDispatch();
  const { commentToReply } = useSelector((state) => state.menu);
  const { addCommentReplyDone } = useSelector((state) => state.post);
  const { me } = useSelector((state) => state.user);

  const [reply, onChangereply, setReply] = useInput(true);
  const [commentReply, onChangeInput, setCommentReply] = useInput('');

  const [commentReplyCheckdId, setCommentReplyCheckdId] = useState();

  const ref = useRef();
  const handleResizeHeight = useCallback(() => {
    if (ref === null || ref.current === null) {
      return;
    }
    ref.current.style.height = '20px';
    ref.current.style.height = ref.current.scrollHeight + 'px';
  }, []); //댓글창 크기 자동조절

  useEffect(() => {
    if (ref === null || ref.current === null) {
      return;
    }
    if (addCommentReplyDone) {
      setCommentReply('');
      dispatch({
        type: COMMENT_TO_REPLY_CLOSE,
      });
    }
  }, [addCommentReplyDone]);

  const onClickReply = useCallback(() => {
    setReply((prev) => !prev);
  }, [reply]);

  const onClickReplyClose = useCallback(() => {
    dispatch({
      type: COMMENT_TO_REPLY_CLOSE,
    });
  }, [commentToReply]);

  // const CommentsNum = post?.Comments?.findIndex(
  //   (v) => v.commentId === commentId,
  // );
  // const commentReplyIdNum =
  //   post.Comments[CommentsNum]?.Comments[
  //     post.Comments[CommentsNum]?.Comments.length - 1
  //   ]?.commentReplyId + 1 || 1;

  const onClickAddReply = useCallback(
    (e) => {
      e.preventDefault();
      if (!commentReply) {
        return alert('댓글을 작성해주세요');
      }
      dispatch({
        type: ADD_COMMENT_REPLY_REQUEST,
        data: {
          postId: post.id,
          commentId,
          // commentReplyId: commentReplyIdNum,
          userId,
          User: {
            id: me.id,
            nickname: me.nickname,
          },
          content: commentReply,
          // bo_no : postId
          // mem_no : me.id
          // cmt_no : commentId
          // cmt_content : commentReply
          // cmt_parent : ??
        },
      });
    },
    [commentId, commentReply, userId],
  );

  const onCLickCommentReplyCheckdId = useCallback(
    (v) => () => {
      setCommentReplyCheckdId(v.commentReplyId);
    },
    [commentReplyCheckdId],
  );

  return (
    <>
      {!v?.Comments[0] ? null : reply ? (
        <button onClick={onClickReply}>
          <span></span>
          <p>답글 보기({v.Comments.length}개)</p>
        </button>
      ) : (
        <button onClick={onClickReply}>
          <span></span>
          <p>답글 숨기기</p>
        </button>
      )}

      {/* 댓글 더보기 컴포넌트 분리하기 */}
      <div>
        <div>
          {!reply &&
            v.Comments.map((v, i) => {
              return (
                <ul key={v.commentReplyId}>
                  <li onClick={onClickOption(v)}>
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
                      <span onClick={onCLickCommentReplyCheckdId(v)}>
                        <CommentOptionBtn
                          post={v}
                          postId={post.id}
                          bool={false}
                          commentReplyCheckdId={commentReplyCheckdId}
                          commentId={commentId}
                        />
                      </span>
                    </div>
                  </li>
                </ul>
              );
            })}
        </div>

        {!commentToReply ? (
          <div className={style.form}>
            <div className={style.commentBox}>
              <div onClick={onClickReplyClose}>X</div>
              <p>{nickname} 님에게 답글 남기는 중</p>
            </div>
            <form>
              <textarea
                className={style.text}
                ref={ref}
                onInput={handleResizeHeight}
                placeholder={`답글달기..`}
                autoComplete="off"
                autoCorrect="off"
                value={commentReply}
                onChange={onChangeInput}
                required
              ></textarea>
              <button onClick={onClickAddReply}>게시</button>
            </form>
          </div>
        ) : null}
      </div>
    </>
  );
};

CommentsToReply.proptypes = {
  v: PropTypes.shape({
    id: PropTypes.number,
    user: PropTypes.object,
    content: PropTypes.string,
    data: PropTypes.string,
    comments: PropTypes.arrayOf(PropTypes.object),
    Images: PropTypes.arrayOf(PropTypes.object),
    Likers: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
  userId: PropTypes.string.isRequired,
  nickname: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  commentId: PropTypes.number.isRequired,
  onClickOption: PropTypes.object.isRequired,
  // id,
};

export default CommentsToReply;
