import React, { FC } from "react";
import QRCode from "react-qr-code";
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";

type ShareSectionProps = {
  url: string;
};

const ShareSection: FC<ShareSectionProps> = ({ url }) => {
  return (
    <section className="flex mb-3 gap-3 border px-4 rounded-md py-4">
      <QRCode size={60} value={url} fgColor="#6c6c6c" />

      <div>
        <div className="mb-2 leading-none text-neutral-700">Bagikan</div>
        <div className="flex gap-3">
          <WhatsappShareButton url={url}>
            <WhatsappIcon
              bgStyle={{
                fill: "#e5e5e5",
              }}
              iconFillColor="#6c6c6c"
              size={32}
              round
            />
          </WhatsappShareButton>
          <LinkedinShareButton url={url}>
            <LinkedinIcon
              bgStyle={{
                fill: "#e5e5e5",
              }}
              iconFillColor="#6c6c6c"
              size={32}
              round
            />
          </LinkedinShareButton>
          <FacebookShareButton url={url}>
            <FacebookIcon
              bgStyle={{
                fill: "#e5e5e5",
              }}
              iconFillColor="#6c6c6c"
              size={32}
              round
            />
          </FacebookShareButton>
        </div>
      </div>
    </section>
  );
};

export default ShareSection;
