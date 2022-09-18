import type { NextPage } from "next";
import { useRouter } from "next/router";
import Alert, { AlertButton } from "../../components/Alert";

//     <Alert>
//       <h1>I&apos;m sorry, you deserve better!</h1>
//       <p>Stay tuned until I figure this out.</p>
//     </Alert>

const Hello: NextPage = () => {
  const router = useRouter();

  return (
    <Alert>
      <h1>Hello yourself!</h1>
      <p>To be honest, i don&apos;t know what this website does.</p>
      <AlertButton
        onClick={() => {
          router.push("/hello/options");
        }}
      >
        I am disappointed
      </AlertButton>
    </Alert>
  );
};

export default Hello;
