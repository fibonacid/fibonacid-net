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
    onComplete(watchName);
  }, [onComplete, watchName]);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Heading>
        Join a community of lucky people that get greeted by name when they
        visit my website.
      </Heading>
      <Field>
        <input
          type="name"
          placeholder={`What's your name?`}
          {...register("name")}
        ></input>
      </Field>
      <Submit>ENTER</Submit>
    </Form>
  );
};

export default FriendForm;
