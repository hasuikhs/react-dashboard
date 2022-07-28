interface user {
  seq?: number;
  userNm: string;
  userId: string;
  userPw?: string;
  isAdmin?: number;
  loginDt?: Date;
  regDt?: Date;
  updDt?: Date;
}

export default user;