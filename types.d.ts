enum ROLE {
  USER = "USER",
  ADMIN = "ADMIN",
  NGO = "NGO",
}
interface AuthCreds {
  email: string;
  password: string;
  role: ROLE;
  fullname: string;
}
