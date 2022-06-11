import { useCallback } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import Button from "./Button";
import Field from "./Field";

const Form = styled.form`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 20rem;
  max-width: calc(100% - 2rem);
  background: #121212;
  padding: 2rem;
  border: solid 1px grey;
`;

const Heading = styled.h2`
  font-size: 1.25rem;
  text-align: center;
  color: lightgrey;
`;

const Submit = styled(Button)`
  width: 100%;
  background-color: grey;
`;

type Fields = {
  name: string;
};

type Props = {
  onComplete: (name: string) => void;
};

const FriendForm: React.FC<Props> = ({ onComplete }) => {
  const { handleSubmit, watch, register } = useForm<Fields>();
  const watchName = watch("name");

  const onSubmit = useCallback(() => {
    const name = watchName?.split(" ")[0]?.slice(0, 10)?.toLowerCase();
    onComplete(name);
  }, [onComplete, watchName]);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Heading>
        Join a community of lucky people who can access this website by typing
        their name
      </Heading>
      <Field>
        <input
          type="name"
          placeholder={`What's your name?`}
          {...register("name")}
        ></input>
      </Field>
      <Submit>PROCEED</Submit>
    </Form>
  );
};

export default FriendForm;
