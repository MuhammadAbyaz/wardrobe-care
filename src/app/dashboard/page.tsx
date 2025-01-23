import { redirect } from "next/navigation";
import React from "react";

const Page = () => {
  redirect("/dashboard/brand");
  return <div>Page</div>;
};

export default Page;
