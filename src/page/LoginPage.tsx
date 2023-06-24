import { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const LoginPage: FC<Props> = ({ children }) => {
  // script

  // template
  return (
    <>
      <div className="flex w-screen h-screen bg-[#fff]">{children}</div>
    </>
  );
};

export { LoginPage };
