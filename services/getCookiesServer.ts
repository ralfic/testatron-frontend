'use server';

import { cookies } from 'next/headers';

export const getCookieServer = async () => {
  const cookieStore = await cookies();
  return cookieStore;
};
