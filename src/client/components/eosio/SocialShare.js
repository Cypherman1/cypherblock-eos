import React from 'react';

import {
  FacebookShareButton,
  // GooglePlusShareButton,
  // LinkedinShareButton,
  TwitterShareButton,
  TelegramShareButton,
  FacebookIcon,
  TwitterIcon,
  // GooglePlusIcon,
  // LinkedinIcon,
  TelegramIcon
} from 'react-share';

const shareUrl = 'https://www.cypherblock.io';
const title = 'A handy EOS Block explorer';

const SocialShare = () => {
  return (
    <div className="">
      <FacebookShareButton
        url={shareUrl}
        quote={title}
        className="Demo__some-network__share-button mb-1"
        aria-label="mobile navigation"
      >
        <FacebookIcon size={26} round />
      </FacebookShareButton>

      <TwitterShareButton
        url={shareUrl}
        title={title}
        className="Demo__some-network__share-button mb-1"
        aria-label="mobile navigation"
      >
        <TwitterIcon size={26} round />
      </TwitterShareButton>

      <TelegramShareButton
        url={shareUrl}
        title={title}
        className="Demo__some-network__share-button mb-1"
        aria-label="mobile navigation"
      >
        <TelegramIcon size={26} round />
      </TelegramShareButton>
    </div>
  );
};

export default SocialShare;
