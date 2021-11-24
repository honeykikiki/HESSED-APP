import produce from 'immer';

export const initialState = {
  logInLoading: false, // 로그인 시도중
  logInDone: false,
  logInError: null,
  logInFailed: true, // 로그인 실패

  logOutLoading: false, // 로그아웃 시도중
  logOutDone: false,
  logOutError: null,
  searchIdLoading: false, // 아이디찾기 시도중
  searchIdDone: false,
  searchIdError: null,
  searchIdFailed: true, // 아이디 찾기 실패

  searchPwLoading: false, // 비밀번호찾기 시도중
  searchPwDone: false,
  searchPwError: null,
  searchPwFailed: true, // 비밀번호찾기 실패

  cerifiedLoading: false, // 인증번호 시도중
  cerifiedDone: false,
  cerifiedError: null,
  passwordChangeLoading: false, // 비민번호 바꾸기 시도중
  passwordChangeDone: false,
  passwordChangeError: null,
  signUpLoading: false, // 회원가입 시도중
  signUpDone: false,
  signUpError: null,
  signUpFailed: true, // 회원가입 실패
  signUpDisplayChange: false, // 회원가입 완료
  duplicateCheckLoading: false, // 아이디 중복체크 시도중
  duplicateCheckDone: false,
  duplicateCheckError: null,
  duplicateCheckDisplay: true,
  savePostLoading: false, // 게시물 저장
  savePostDone: false,
  savePostError: null,
  unSavePostLoading: false, // 게시물 저장취소
  unSavePostDone: false,
  unSavePostError: null,
  changeNicknameLoading: false, // 닉네임 수정
  changeNicknameDone: false,
  changeNicknameError: null,
  changeProfileImgLoading: false, // 프로필 이미지 수정
  changeProfileImgDone: false,
  changeProfileImgError: null,

  me: null,
  SearchID: null,
  SearchPW: null,
};

export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';

export const SIGN_UP_REQUEST = 'SING_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SING_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SING_UP_FAILURE';

export const DUPLICATE_CHECK_REQUEST = 'DUPLICATE_CHECK_REQUEST';
export const DUPLICATE_CHECK_SUCCESS = 'DUPLICATE_CHECK_SUCCESS';
export const DUPLICATE_CHECK_FAILURE = 'DUPLICATE_CHECK_FAILURE';

export const SAVE_POST_REQUEST = 'SAVE_POST_REQUEST';
export const SAVE_POST_SUCCESS = 'SAVE_POST_SUCCESS';
export const SAVE_POST_FAILURE = 'SAVE_POST_FAILURE';

export const UNSAVE_POST_REQUEST = 'UNSAVE_POST_REQUEST';
export const UNSAVE_POST_SUCCESS = 'UNSAVE_POST_SUCCESS';
export const UNSAVE_POST_FAILURE = 'UNSAVE_POST_FAILURE';

export const CHANGE_NICKNAME_REQUEST = 'CHANGE_NICKNAME_REQUEST';
export const CHANGE_NICKNAME_SUCCESS = 'CHANGE_NICKNAME_SUCCESS';
export const CHANGE_NICKNAME_FAILURE = 'CHANGE_NICKNAME_FAILURE';

export const CHANGE_PROFILEIMG_REQUEST = 'CHANGE_PROFILEIMG_REQUEST';
export const CHANGE_PROFILEIMG_SUCCESS = 'CHANGE_PROFILEIMG_SUCCESS';
export const CHANGE_PROFILEIMG_FAILURE = 'CHANGE_PROFILEIMG_FAILURE';

export const SEARCH_ID_REQUEST = 'SEARCH_ID_REQUEST';
export const SEARCH_ID_SUCCESS = 'SEARCH_ID_SUCCESS';
export const SEARCH_ID_FAILURE = 'SEARCH_ID_FAILURE';

export const SEARCH_PW_REQUEST = 'SEARCH_PW_REQUEST';
export const SEARCH_PW_SUCCESS = 'SEARCH_PW_SUCCESS';
export const SEARCH_PW_FAILURE = 'SEARCH_PW_FAILURE';

export const CERIFIED_REQUEST = 'CERIFIED_REQUEST';
export const CERIFIED_SUCCESS = 'CERIFIED_SUCCESS';
export const CERIFIED_FAILURE = 'CERIFIED_FAILURE';

export const PASSWORD_CHANGE_REQUEST = 'PASSWORD_CHANGE_REQUEST';
export const PASSWORD_CHANGE_SUCCESS = 'PASSWORD_CHANGE_SUCCESS';
export const PASSWORD_CHANGE_FAILURE = 'PASSWORD_CHANGE_FAILURE';

export const SEARCHID_DELITE = 'SEARCHID_DELITE';

export const SIGNUP_CHANGE_DISPLAY = 'SIGNUP_CHANGE_DISPLAY';

export const LOGIN_FAILED = 'LOGIN_FAILED';
export const SIGNUP_FAILED = 'SIGNUP_FAILED';

const dummyUser = (data) => ({
  // ...data,
  no: data.mem_no,
  id: data.mem_id,
  name: data.mem_name,
  nickname: data.mem_nickname,
  profileImg: data.mem_profileimg,
  grade: data.mem_grade,
  Posts: [],
  Liked: [],
  Saved: [],
});

// 혼자할떄
// const dummyUser = (data) => ({
//   ...data,
//   no: 1,
//   id: 'data.mem_id',
//   name: 'data.mem_name',
//   nickname: 'data.mem_nickname',
//   profileImg: null,
//   grade: 'data.mem_grade',
//   Posts: [],
//   Liked: [],
//   Saved: [],
// });

const reducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      //로그인
      case LOG_IN_REQUEST:
        draft.logInLoading = true;
        draft.logInDone = false;
        draft.logInError = null;
        break;
      case LOG_IN_SUCCESS:
        // draft.me = dummyUser();
        if (action.data.result === 'SUCCESS') {
          draft.me = dummyUser(action.data.member); //action.data;
          draft.logInLoading = false;
          draft.logInDone = true;
          draft.logInFailed = true;
        } else {
          draft.logInLoading = false;
          draft.logInDone = false;
          draft.logInFailed = false;
        }
        break;
      case LOG_IN_FAILURE:
        draft.logInLoading = false;
        draft.logInError = action.error;
        break;
      //로그아웃
      case LOG_OUT_REQUEST:
        draft.logOutLoading = true;
        draft.logOutDone = false;
        draft.logOutError = null;
        break;
      case LOG_OUT_SUCCESS:
        if (action.data.result === 'LOGOUT') {
          draft.logOutLoading = false;
          draft.logOutDone = true;
          draft.me = null;
        } else {
          draft.logOutLoading = false;
          draft.logOutDone = false;
        }
        break;
      case LOG_OUT_FAILURE:
        draft.logOutLoading = false;
        draft.logOutError = action.error;
        break;

      // 아이디 찾기
      case SEARCH_ID_REQUEST:
        draft.searchIdLoading = true;
        draft.searchIdDone = false;
        draft.searchIdError = null;
        break;
      case SEARCH_ID_SUCCESS:
        if (action.data.result === 'EXIST') {
          draft.searchIdLoading = false;
          draft.searchIdDone = true;
          draft.searchIdFailed = true;
          draft.SearchID = action.data.id;
        } else {
          draft.searchIdLoading = false;
          draft.searchIdDone = false;
          draft.searchIdFailed = false;
        }
        break;
      case SEARCH_ID_FAILURE:
        draft.searchIdLoading = false;
        draft.searchIdError = action.error;
        break;

      // 비밀번호 찾기
      case SEARCH_PW_REQUEST:
        draft.searchPwLoading = true;
        draft.searchPwDone = false;
        draft.searchPwError = null;
        break;
      case SEARCH_PW_SUCCESS:
        if (action.data.result === 'EXIST') {
          draft.searchPwLoading = false;
          draft.searchPwDone = true;
          draft.SearchPW = dummyUser(action.data.memberVO);
          alert('입력하신 이메일을 확인해주세요');
        } else if (action.data.result === 'NOTEXIST') {
          draft.searchPwLoading = false;
          draft.searchPwDone = false;
          alert('유저정보가 잘못되었습니다.');
        }
        break;
      case SEARCH_PW_FAILURE:
        draft.searchPwLoading = false;
        draft.searchPwError = action.error;
        break;
      // 인증번호 확인
      case CERIFIED_REQUEST:
        draft.cerifiedLoading = true;
        draft.cerifiedDone = false;
        draft.cerifiedError = null;
        break;
      case CERIFIED_SUCCESS:
        if (action.data.result === 'OK') {
          draft.cerifiedLoading = false;
          draft.cerifiedDone = true;
        } else {
          draft.cerifiedLoading = false;
          draft.cerifiedDone = false;
          alert('안증번호가 틀렸습니다');
        }
        break;
      case CERIFIED_FAILURE:
        draft.cerifiedDone = false;
        draft.cerifiedError = action.error;
        break;
      // 비밀번호 바꾸기
      case PASSWORD_CHANGE_REQUEST:
        draft.passwordChangeLoading = true;
        draft.passwordChangeDone = false;
        draft.passwordChangeError = null;
        break;
      case PASSWORD_CHANGE_SUCCESS:
        if (action.data.result === 'OK') {
          draft.passwordChangeLoading = false;
          draft.passwordChangeDone = true;
          draft.SearchPW = null;
          alert('비밀번호 변경이 완료되었습니다');
        } else {
          draft.passwordChangeLoading = false;
          draft.passwordChangeDone = false;
        }
        break;
      case PASSWORD_CHANGE_FAILURE:
        draft.passwordChangeLoading = false;
        draft.passwordChangeError = action.error;
        break;

      //회원가입
      case SIGN_UP_REQUEST:
        draft.signUpLoading = true;
        draft.signUpDone = false;
        draft.signUpError = null;
        break;
      case SIGN_UP_SUCCESS:
        if (action.data.result === 'SUCCESS') {
          draft.signUpLoading = false;
          draft.signUpDone = true;
          draft.duplicateCheckDisplay = true;
          draft.signUpFailed = true;
          draft.signUpDisplayChange = true;
        } else if (action.data.result === 'EXIST') {
          alert('아이디가 중복입니다.');
          draft.signUpLoading = false;
          draft.signUpDone = false;
          draft.signUpFailed = false;
        } else {
          alert('회원가입이 실패했습니다');
          draft.signUpLoading = false;
          draft.signUpDone = false;
          draft.signUpFailed = false;
        }
        break;
      case SIGN_UP_FAILURE:
        draft.signUpLoading = false;
        draft.signUpError = action.error;
        break;

      case SIGNUP_FAILED:
        draft.signUpFailed = false;
        break;

      // 아이디 중복체크
      case DUPLICATE_CHECK_REQUEST:
        draft.duplicateCheckLoading = true;
        draft.duplicateCheckDone = false;
        draft.duplicateCheckError = null;
        break;
      case DUPLICATE_CHECK_SUCCESS:
        if (action.data.result === 'EXIST') {
          draft.duplicateCheckLoading = false;
          draft.duplicateCheckDone = false;
          draft.duplicateCheckDisplay = false;
          draft.signUpFailed = false;
        } else {
          draft.duplicateCheckLoading = false;
          draft.duplicateCheckDone = true;
          draft.duplicateCheckDisplay = true;
        }

        break;
      case DUPLICATE_CHECK_FAILURE:
        draft.duplicateCheckLoading = false;
        draft.duplicateCheckError = action.error;
        break;

      // 게시물 저장하기
      case SAVE_POST_REQUEST:
        draft.savePostLoading = true;
        draft.savePostDone = false;
        draft.savePostError = null;
        break;
      case SAVE_POST_SUCCESS: {
        draft.savePostLoading = false;
        draft.savePostDone = true;
        draft.savePostError = null;
        draft.me.Saved.push({ id: action.data.boardVO.bo_no });
        break;
      }
      case SAVE_POST_FAILURE:
        draft.savePostDone = false;
        draft.savePostError = action.error;
        break;
      // 게시물 저장하기 취소
      case UNSAVE_POST_REQUEST:
        draft.unSavePostLoading = true;
        draft.unSavePostDone = false;
        draft.unSavePostError = null;
        break;
      case UNSAVE_POST_SUCCESS: {
        draft.me.Saved = draft.me.Saved.filter(
          (v) => v.id !== action.data.boardVO.bo_no,
        );
        draft.unSavePostLoading = false;
        draft.unSavePostDone = true;
        draft.unSavePostError = null;
        break;
      }
      case UNSAVE_POST_FAILURE:
        draft.unSavePostDone = false;
        draft.unSavePostError = action.error;
        break;

      // 닉네임 수정하기
      case CHANGE_NICKNAME_REQUEST:
        draft.changeNicknameLoading = true;
        draft.changeNicknameDone = false;
        draft.changeNicknameError = null;
        break;
      case CHANGE_NICKNAME_SUCCESS: {
        draft.changeNicknameLoading = false;
        draft.changeNicknameDone = true;
        draft.changeNicknameError = null;
        draft.me.nickname = action.data.nickname;
        break;
      }
      case CHANGE_NICKNAME_FAILURE:
        draft.changeNicknameDone = false;
        draft.changeNicknameError = action.error;
        break;

      // 프로필 이미지 수정하기
      case CHANGE_PROFILEIMG_REQUEST:
        draft.changeProfileImgLoading = true;
        draft.changeProfileImgDone = false;
        draft.changeProfileImgError = null;
        break;
      case CHANGE_PROFILEIMG_SUCCESS: {
        draft.changeProfileImgLoading = false;
        draft.changeProfileImgDone = true;
        draft.changeProfileImgError = null;
        draft.me.profileImg = action.data;
        break;
      }
      case CHANGE_PROFILEIMG_FAILURE:
        draft.changeProfileImgDone = false;
        draft.changeProfileImgError = action.error;
        break;

      // 찾은 아이디 삭제
      case SEARCHID_DELITE:
        draft.SearchID = null;

      // 회원 가입 완료후 로그인창 전환
      case SIGNUP_CHANGE_DISPLAY:
        draft.signUpDisplayChange = false;
      default:
        break;
    }
  });
};
export default reducer;
