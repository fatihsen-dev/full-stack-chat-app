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
      _id?: string;
      user: {
         _id: string;
         username: string;
      };
      messages: Array<{
         user: string;
         message: string;
         _id?: string;
         date?: string;
      }>;
   };
};

export type Types = MessagesType & activeUserType;
