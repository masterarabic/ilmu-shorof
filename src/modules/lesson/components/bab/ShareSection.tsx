import React from "react";
import QRCode from "react-qr-code";
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";

export const ShareSection = () => {
  return (
    <section className="flex mb-3 gap-3 border px-4 rounded-md py-4">
      <QRCode size={60} value="hey" fgColor="#6c6c6c" />

      <div>
        <div className="mb-2 leading-none text-neutral-700">Bagikan</div>
        <div className="flex gap-3">
          <WhatsappShareButton url="https://www.npmjs.com/package/react-share">
            <WhatsappIcon
              bgStyle={{
                fill: "#e5e5e5",
              }}
              iconFillColor="#6c6c6c"
              size={32}
              round
            />
          </WhatsappShareButton>
          <LinkedinShareButton url="https://www.npmjs.com/package/react-share">
            <LinkedinIcon
              bgStyle={{
                fill: "#e5e5e5",
              }}
              iconFillColor="#6c6c6c"
              size={32}
              round
            />
          </LinkedinShareButton>
          <FacebookShareButton url="https://www.npmjs.com/package/react-share">
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
