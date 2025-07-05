// /src/app/free/page.tsx

"use client";

// External libraries
import React from "react";

// Components libraries
import FreeClaim0 from "@/components/contents/FreeClaim0";
import DynamicLoginPage from "@/components/logins/DynamicLogin";

const PageToken: React.FC = () => (
  <DynamicLoginPage ContentComponent={() => <FreeClaim0 />} />
);

export default PageToken;
