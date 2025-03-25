import Cookies from 'js-cookie';

export const getConnectionSid = () => {
  const connectSid = Cookies.get('connect.sid');
  return connectSid || null;
};

export const deleteConnectionSid = () => {
  Cookies.remove('connect.sid');
};
