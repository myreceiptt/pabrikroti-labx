// /src/app/rise11th/page.tsx

"use client";

// External libraries
import React from "react";

// Components libraries
import FreeClaim from "@/components/contents/FreeClaim";
import DynamicLoginPage from "@/components/logins/DynamicLogin";

const PageRise11Th: React.FC = () => (
  <DynamicLoginPage ContentComponent={() => <FreeClaim />} />
);

export default PageRise11Th;
