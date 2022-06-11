import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Field from "./Field";

type Fields = {
  password: string;
};

type Props = {
  password: string;
  onLogin: (password: string) => void;
};

const LoginForm: React.FC<Props> = ({ onLogin, password }) => {
  const { handleSubmit, watch, register } = useForm<Fields>();
  const watchPassword = watch("password");

  useEffect(() => {
    if (password.toLowerCase() === watchPassword?.toLowerCase()) {
      onLogin(password);
    }
  }, [password, watchPassword, onLogin]);

  return (
    <form onSubmit={handleSubmit(() => console.log("Submit"))}>
      <Field>
        <input
          type="password"
          placeholder={`Type "${password}" to enter`}
          {...register("password")}
        ></input>
      </Field>
      {/* <Submit>ENTER</Submit> */}
    </form>
  );
};

export default LoginForm;
