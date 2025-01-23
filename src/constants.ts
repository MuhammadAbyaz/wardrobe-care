import { Landmark } from "lucide-react";
import { User } from "lucide-react";
import { HandHelping } from "lucide-react";
export const adminSideBarLinks = [
  {
    img: Landmark,
    route: "/dashboard/brand",
    text: "Brand Management",
  },
  {
    img: User,
    route: "/dashboard/user",
    text: "User Management",
  },
  {
    img: HandHelping,
    route: "/dashboard/ngo",
    text: "NGO Management",
  },
];
