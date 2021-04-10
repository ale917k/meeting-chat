import React from "react";
import { Link as RouterLink } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import CardForm from "components/global/CardForm";

type PropsType = {
  admin?: boolean;
};

/**
 * Login page for logging into user account on form submission.
 * @returns Controlled form which triggers a POST request at /users/signin on form submission.
 */
const Login: React.FC<PropsType> = ({ admin }: PropsType) => {
  // Form for logging User into account
  const loginForm = [
    {
      type: "text",
      name: "name",
      label: "Nome",
      required: true,
    },
    {
      type: "password",
      name: "password",
      label: "Password",
      required: true,
    },
  ];

  return (
    <CardForm
      title="Accedi"
      initialForm={{
        name: "",
        password: "",
      }}
      inputList={loginForm}
      requestType={admin ? "loginAdminUser" : "loginUser"}
      buttonText="Accedi"
    >
      {!admin && (
        <Typography variant="body1">
          Non hai un account?&nbsp;
          <Link color="secondary" component={RouterLink} to="/registrati">
            Registrati
          </Link>
        </Typography>
      )}
    </CardForm>
  );
};

export default Login;
