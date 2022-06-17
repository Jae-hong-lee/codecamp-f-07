import { useMutation } from "@apollo/client";
import { Modal } from "antd";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { accessTokenState } from "../../../commons/store";

import LoginPresenterPage from "./Login.presenter";
import { LOGIN_USER } from "./Login.queries";

export default function LoginContainerPage() {
  const [loginUser] = useMutation(LOGIN_USER);
  const [, setAccessToken] = useRecoilState(accessTokenState);

  const onClickLogin = async (data: any) => {
    try {
      console.log(data.email);
      const result = await loginUser({
        variables: {
          ...data,
        },
      });
      const accessToken = result.data?.loginUser.accessToken;
      setAccessToken(accessToken);
      console.log(accessToken);
      Modal.success({ content: "로그인성공!" });
      localStorage.setItem("accessToken", accessToken);
      router.push("/market/new");
    } catch (error) {
      Modal.error({ content: "로그인실패!" });
    }
  };

  const router = useRouter();
  const onClickSignUpMoveBtn = () => {
    router.push("./Signup");
  };

  return (
    <LoginPresenterPage
      onClickLogin={onClickLogin}
      onClickSignUpMoveBtn={onClickSignUpMoveBtn}
    />
  );
}