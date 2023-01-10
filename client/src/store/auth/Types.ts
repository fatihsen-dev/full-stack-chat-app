export type UserStatusType = {
   userStatus: null | boolean;
};

export type UserType = {
   user: {
      token: string;
      username: string;
      _id: string;
   };
};

export type AuthType = UserStatusType & UserType;
