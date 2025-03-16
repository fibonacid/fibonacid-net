import {
  DevLink,
  GithubLink,
  InstagramLink,
  LinkedInLink,
  SoundCloudLink,
  BandcampLink,
} from "@/components/SocialLink";

const USERNAME = "fibonacid";

export const Links = () => (
  <nav className="flex gap-3 flex-wrap items-center justify-center">
    <GithubLink username={USERNAME} />
    <SoundCloudLink username={USERNAME} />
    <DevLink username={USERNAME} />
    <LinkedInLink username={USERNAME} />
    <InstagramLink username={USERNAME} />
    <BandcampLink username={USERNAME} />
  </nav>
);
