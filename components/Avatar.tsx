import styled from "styled-components";
import Image from "next/image";
import avatar from "../public/avatar.jpg";

const Container = styled.div`
  width: 100%;
  aspect-ratio: 1;
  border-radius: 50%;
  position: relative;
  overflow: hidden;
`;

type Props = {
  className?: string;
};

const Avatar: React.FC<Props> = ({ className }) => {
  return (
    <Container className={className}>
      <Image src={avatar} alt="Avatar" layout="fill" placeholder="blur" />
    </Container>
  );
};

export default Avatar;
