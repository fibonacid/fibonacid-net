import Head from "next/head";
import { memo } from "react";
import preview from "../public/preview.jpg";

type Props = {
  title?: string;
  description?: string;
  image?: {
    src: string;
    width: number;
    height: number;
  };
};

const SEO: React.FC<Props> = (props) => {
  const { title, description, image } = props;
  return (
    <Head>
      <title>{title || "fibonacid"}</title>
      <meta name="description" content={description || "Developer portfolio"} />
      <meta property="og:image" content={image?.src || preview.src} />
      <meta
        property="og:image:width"
        content={(image?.width || preview.width).toString()}
      />
      <meta
        property="og:image:height"
        content={(image?.height || preview.height).toString() || ""}
      />
    </Head>
  );
};

export default memo(SEO);
