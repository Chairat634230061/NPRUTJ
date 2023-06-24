import { FC } from "react";
import { LoginPage } from "./page/LoginPage";
import { LoginForm } from "./component/LoginForm";

// component template
const App: FC = () => {
  return (
    <>
      <LoginPage>
        <LoginForm />
      </LoginPage>
    </>
  );
};

export { App };
