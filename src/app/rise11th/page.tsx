// /src/app/rise11th/page.tsx

"use client";

// External libraries
import React from "react";

// Components libraries
import FreeClaim2 from "@/components/contents/FreeClaim2";
import DynamicLoginPage from "@/components/logins/DynamicLogin";

const PageRise11Th: React.FC = () => (
  <DynamicLoginPage ContentComponent={() => <FreeClaim2 />} />
);

export default PageRise11Th;
