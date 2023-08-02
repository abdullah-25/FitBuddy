import { TwitterShareButton } from "react-share";
import { Button } from "@chakra-ui/react";
import "./ShareButton.scss";

import { ExternalLinkIcon } from "@chakra-ui/icons";

export default function ShareButton({
  shareUrl,
  quote,
  twitterMessage,
  convertChartToImage,
}) {
  return (
    <div className="sharebtn">
      {/* Twitter Share */}
      <TwitterShareButton url={shareUrl} title={twitterMessage}>
        <Button
          rightIcon={<ExternalLinkIcon />}
          colorScheme="teal"
          variant="outline"
        >
          Share on Twitter
        </Button>
      </TwitterShareButton>
    </div>
  );
}
