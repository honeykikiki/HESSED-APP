const mainposts = [
  {
    id,
    User: {
      id,
      nickname,
    },
    content,
    Images: [],
    Likers,

    Comments: [
      {
        postId,
        commentId,
        User: {
          id,
          nickname,
        },
        content,
        Comments: [
          {
            postId,
            commentId,
            commentReplyId,
            User: {
              id,
              nickname,
            },
            content,
          },
        ],
      },
    ],
  },
];

const me = {
  myName,
  id,
  nickname,
  area,
  phonenumber,
  mypost: [],
  liked: [],
  saved: [],
  Followers: [],
  Followings: [],
};