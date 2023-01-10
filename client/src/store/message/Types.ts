export type MessagesType = {
   messages: Array<{
      _id: string;
      users: Array<{
         _id: string;
         username: string;
      }>;
      messages: Array<{
         user: string;
         message: string;
         _id: string;
         date: string;
      }>;
   }>;
};

export type activeUserType = {
   activeUser: {
      username: string;
      _id: string;
   };
};

export type Types = MessagesType & activeUserType;
