export type JwtPayload = {
  id: number;
  type: 'EMAIL_VERIFICATION' | 'AUTHENTICATION';
};
