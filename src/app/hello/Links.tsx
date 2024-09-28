import {
  DevLink,
  GHLink,
  InstagramLink,
  LinkedInLink,
  TwitterLink,
} from "@/components/SocialLink";

const USERNAME = "fibonacid";

export const Links = () => (
  <nav className="flex gap-3 flex-wrap items-center justify-center mx-5">
    <GHLink username={USERNAME} />
    <LinkedInLink username={USERNAME} />
    <TwitterLink username={USERNAME} />
    <DevLink username={USERNAME} />
    <InstagramLink username={USERNAME} />
  </nav>
);
