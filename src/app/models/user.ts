export default class User {
  googleId: number;
  email: string;
  name: string;
  photoUrl: string;
  token: string;
}

// note: this is what is saved in DB. See also SocialUser