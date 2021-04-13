type ThemeVariant = import("@material-ui/core/styles/createTypography").Variant;

type Form = RegUserForm | LogUserForm | EditUserForm;

type MuiEvent = HTMLInputElement | { type?: string; name?: string; value: unknown; checked?: boolean };

type Input = {
  type: string;
  name: string;
  label: string;
  required: boolean;
};

type Variant = ThemeVariant | "srOnly";
