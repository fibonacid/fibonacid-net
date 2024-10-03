import {
  DevLink,
  GHLink,
  InstagramLink,
  LinkedInLink,
  SoundCloudLink,
} from "@/components/SocialLink";

const USERNAME = "fibonacid";

export const Links = () => (
  <nav className="flex gap-3 flex-wrap items-center justify-center">
    <GHLink username={USERNAME} />
    <SoundCloudLink username={USERNAME} />
    <DevLink username={USERNAME} />
    {/* <TwitterLink username={USERNAME} /> */}
    <LinkedInLink username={USERNAME} />
    <InstagramLink username={USERNAME} />
  </nav>
);
