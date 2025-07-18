// /src/app/bubu29/page.tsx

"use client";

// External libraries
import React from "react";

// Components libraries
import FreeClaim from "@/components/contents/FreeClaim";
import DynamicLoginPage from "@/components/logins/DynamicLogin";

const PageBuBu29: React.FC = () => (
  <DynamicLoginPage ContentComponent={() => <FreeClaim />} />
);

export default PageBuBu29;
