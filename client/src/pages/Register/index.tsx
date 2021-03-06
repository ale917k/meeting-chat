import React from "react";
import { Link as RouterLink } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import CardForm from "components/global/CardForm";

/**
 * Page for registering new Users.
 */
const Register: React.FC = () => {
  // Form for registering new User
  const registerForm = [
    {
      type: "text",
      name: "username",
      label: "Nome",
      required: true,
    },
    {
      type: "date",
      name: "born",
      label: "Data di Nascita",
      required: true,
    },
    {
      type: "password",
      name: "password",
      label: "Password",
      required: true,
    },
    {
      type: "checkbox",
      name: "status",
      label: "Pronto a chattare con altre persone?",
      required: true,
    },
  ];

  return (
    <CardForm
      title="Registrati"
      initialForm={{
        username: "",
        born: null,
        password: "",
        status: false,
        topicTitle: "",
        topicCategory: "",
      }}
      inputList={registerForm}
      requestType="addNewUser"
      buttonText="Crea nuovo account"
    >
      <Typography variant="body1">
        Gia&apos; registrato?&nbsp;
        <Link color="secondary" component={RouterLink} to="/accedi">
          Accedi
        </Link>
      </Typography>
    </CardForm>
  );
};

export default Register;
