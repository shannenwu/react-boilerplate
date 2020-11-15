import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext";

const SignUp: React.FC = () => {
  const { signUp } = useContext(UserContext);

  // TODO: replace, this was for testing only.
  return <div onClick={() => signUp("shannen", "123")}>sign up</div>;
};

export default SignUp;
