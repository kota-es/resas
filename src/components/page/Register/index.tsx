import {
  description,
  form,
  formContainer,
  heading,
  input,
  layout,
} from "@/components/page/Register/Register.css";
import { Button } from "@/components/shared/Button";
import { FormEventHandler, useId } from "react";
import { useNavigate } from "react-router-dom";

export const Register = () => {
  const id = useId();
  const navigate = useNavigate();

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const apiKey = form.get("apiKey") as string;
    localStorage.setItem("apiKey", apiKey);
    navigate("/");
  };

  return (
    <div className={layout}>
      <div className={formContainer}>
        <form className={form} aria-labelledby={id} onSubmit={onSubmit}>
          <h2 id={id} className={heading}>
            RESAS APIキー登録
          </h2>
          <div>
            <input
              className={input}
              type="text"
              name="apiKey"
              placeholder="RESASのAPIキーを入力してください"
            />
          </div>
          <div className={description}>
            登録したAPIキーはブラウザに保存されます
          </div>
          <Button>登録</Button>
        </form>
      </div>
    </div>
  );
};
