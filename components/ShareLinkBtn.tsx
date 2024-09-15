"use client";

import { useState } from "react";
import { LinkIcon } from "@heroicons/react/16/solid";

const ShareLinkBtn = () => {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    // Copy URL to clipboard
    navigator.clipboard.writeText(window.location.href);

    setClicked(true);
    setTimeout(() => setClicked(false), 5000);
  };

  return (
    <button
      onClick={handleClick}
      className='my-2 rounded items-center border px-2 py-1 bg-violet-500 text-white text-sm hover:bg-violet-600'>
      <LinkIcon className='w-4 h-4 inline-block mr-1' />
      {clicked ? "Link Copied" : "Share Link"}
    </button>
  );
};
export default ShareLinkBtn;
