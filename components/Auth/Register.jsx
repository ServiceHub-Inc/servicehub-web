import PropTypes from "prop-types";
import React from "react";
import {
  TextInput,
  PasswordInput,
  Checkbox,
  Paper,
  Title,
  Text,
  Group,
  Button,
  Anchor,
  UnstyledButton,
  Modal,
  Divider,
} from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import * as Yup from "yup";
import Link from "next/link";
import {
  MdMail,
  MdLock,
  MdPerson,
  MdPhoneIphone,
  MdPassword,
  MdLogin,
} from "react-icons/md";
import Image from "next/image";
import { withRouter } from "next/router";
import { useIsomorphicEffect } from "@mantine/hooks";
import { LoadingContext } from "../Application/LoadingProvider";
import apiFetcher from "../../lib/hooks/apiFetcher";
import notify from "../../lib/notify";
import { LoginContext } from "../../lib/contexts/LoginContext";
// import ResetPassword from "../Application/Dashboard/Settings/ResetPasswordRequest";
import logoSm from "../../public/images/logo.webp";
import { decode } from "../../lib/helperFunctions";
import { GoogleButton, FacebookButton } from "../utils/SocialButtons";

const schema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  phone: Yup.number().required("Phone number is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
  confirmPassword: Yup.string().required("Please Confirm Password"),
  referralCode: Yup.string(),
});

function Register({ isAdmin, router }) {
  const [notiShown, setNotiShown] = React.useState(false);
  const redirectUrl = React.useMemo(
    () => decode(router?.query?.next),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  console.log(redirectUrl);
  const form = useForm({
    schema: yupResolver(schema),
    initialValues: {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      password: "",
      confirmPassword: "",
      referralCode: "",
    },
  });
  const register = form.getInputProps;
  const [agreement, setAgreement] = React.useState(false);
  const { setPageLoading } = React.useContext(LoadingContext);
  const { setLoginState } = React.useContext(LoginContext);

  const handleLogin = async (data) => {
    setPageLoading(true);
    const res = await apiFetcher({
      url: isAdmin ? "api/admin/auth/signup" : "/signup",
      method: "POST",
      data,
    });
    const { message, statusCode, data: responseData, code } = res;
    console.log(res);
    if (statusCode === 200) {
      if (code === "000") {
        notify.success({ message, title: "Registration Success" });
        setLoginState({
          token: responseData.access_token,
          loginType: isAdmin ? "admin" : "user",
          profile: responseData.user,
        });

        const defaultUrl = isAdmin ? "/admin/dashboard" : "/dashboard";
        const url = redirectUrl || defaultUrl;
        console.log(redirectUrl);
        window.location.assign(url);
        return;
      }

      setPageLoading(false);
      notify.error({
        title: "Login Failed",
        message,
      });
      return;
    }
    setPageLoading(false);
    notify.error({
      title: "Login Failed",
      message,
    });
    return;
  };

  useIsomorphicEffect(() => {
    const midmes = router?.query?.midmes;
    router.push(router.pathname);
    setNotiShown(true);
    if (midmes) {
      const notification = JSON.parse(decode(midmes));
      notify.warn(notification);
    }
  }, [notiShown]);

  return (
    <div className="absolute w-full h-[calc(100vh-69px)] my-auto mx-auto max-w-[min(100vw,450px)] lg:max-w-full lg:grid lg:grid-cols-5  overflow-y-hidden">
      <div className="hidden lg:block bg-top bg-no-repeat bg-cover bg-login col-span-3" />
      <div className="lg:col-span-2 lg:px-16 mx-auto w-full overflow-y-scroll">
        <Paper
          // className="w-full"
          component="form"
          // withBorder
          // shadow="sm"
          p={40}
          mt={0}
          radius="sm"
        >
          <div className="flex flex-col items-center justify-center text-gray-800">
            <Image height={60} width={60} alt="ServiceHub Logo" src={logoSm} />
            <Title align="center" className="mt-4 text-xl font-bold">
              {isAdmin ? "Admin Login" : "ServiceHub"}
            </Title>
          </div>
          <Text color="dimmed" className="" size="sm" align="center" m={5}>
            Account Creation
          </Text>
          <Group grow mb="md" mt="md">
            <GoogleButton radius="xl">Google</GoogleButton>
            <FacebookButton radius="xl">Facebook</FacebookButton>
          </Group>
          <Divider
            label="Or continue with email"
            labelPosition="center"
            my="lg"
          />
          <TextInput
            label="First Name"
            placeholder="Devonne"
            icon={<MdPerson size={14} />}
            mt="md"
            {...register("firstName")}
          />
          <TextInput
            label="Last Name"
            placeholder="McCarthy"
            icon={<MdPerson size={14} />}
            mt="md"
            {...register("lastName")}
          />
          <TextInput
            label="Phone Number"
            placeholder="0295632145"
            icon={<MdPhoneIphone size={14} />}
            mt="md"
            {...register("phone")}
          />
          <TextInput
            label="Email"
            placeholder="username@mail.com"
            icon={<MdMail size={14} />}
            mt="md"
            {...register("email")}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            required
            icon={<MdLock size={14} />}
            mt="md"
            {...register("password")}
          />
          <PasswordInput
            label="Confirm Password"
            placeholder="Enter password again"
            required
            icon={<MdLock size={14} />}
            mt="md"
            {...register("confirmPassword")}
          />
          <TextInput
            label="Referral Code"
            placeholder="Enter referral code"
            icon={<MdPassword size={14} />}
            mt="md"
            {...register("referralCode")}
          />

          <Group mt="md">
            <Checkbox label="I agree to the" />
            <UnstyledButton
              className="text-xs text-primary"
              onClick={() => setAgreement(true)}
            >
              Terms and Conditions
            </UnstyledButton>
          </Group>

          <Button
            fullWidth
            mt="xl"
            component="button"
            type="submit"
            className="bg-primary mb-6"
            onClick={form.onSubmit(handleLogin)}
          >
            REGISTER
          </Button>
          {/* <Divider my="lg" /> */}
          {!isAdmin && (
            <Text color="dimmed" size="sm" align="center" mt={5}>
              Have an account?{" "}
              <Link href="/login" passHref>
                <Anchor component="a" pl={4} size="sm" className="text-primary">
                  <MdLogin
                    size={16}
                    style={{ verticalAlign: "text-bottom", paddingBottom: 2 }}
                  />{" "}
                  Login
                </Anchor>
              </Link>
            </Text>
          )}
        </Paper>
      </div>
      {/* <Modal
        opened={resettingPassword}
        onClose={() => setRessettingPassword(false)}
        title="Reset Password Request"
        classNames={{ title: "text-md font-bold text-black mx-auto" }}
        centered
        size="lg"
        transition="slide-up"
      >
        <ResetPassword closeModal={() => setRessettingPassword(false)} />
      </Modal> */}
    </div>
  );
}

export default withRouter(Register);
Register.propTypes = {
  isAdmin: PropTypes.bool,
  router: PropTypes.shape({
    pathname: PropTypes.string,
    push: PropTypes.func,
    query: PropTypes.shape({
      midmes: PropTypes.string,
      next: PropTypes.string,
    }),
  }).isRequired,
};
Register.defaultProps = {
  isAdmin: false,
};
