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
interface NGOAuthCreds {
  orgname: string;
  email: string;
  password: string;
  role: ROLE;
  registrationnumber: string;
}