import React from "react";

// icons
import { MdOpenInNew } from "react-icons/md";

const SignatureFooter = () => {
  return (
    <div className="font-normal inline-flex gap-4 text-theme-text mb-16 sm:mb-0">
      @lindman
      <a
        href="https://github.com/yoga-python/coding-projects-todo"
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-1 underline decoration-theme-text "
      >
        GitHub
        <MdOpenInNew />
      </a>
    </div>
  );
};

export default SignatureFooter;
