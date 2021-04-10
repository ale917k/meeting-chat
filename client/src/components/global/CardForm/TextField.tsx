import React, { useState } from "react";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import FilledInput from "@material-ui/core/FilledInput";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import useStyles from "./styles";

type Props = {
  handleChange: (event: React.ChangeEvent<MuiEvent>) => void;
  type: string;
  label: string;
  name: string;
  value: string;
  required: boolean;
};

const TextField: React.FC<Props> = ({ handleChange, type, label, name, value, required }: Props) => {
  const classes = useStyles();

  // Toggle password visibility for inputs of that type
  const [showPassword, setShowPassword] = useState(false);

  return (
    <FormControl variant="filled" size="small" fullWidth required={required}>
      <InputLabel htmlFor={name}>{label}</InputLabel>
      <FilledInput
        id={name}
        type={showPassword ? "text" : type}
        name={name}
        value={value}
        onChange={handleChange}
        className={classes.field}
        endAdornment={
          type === "password" && (
            <InputAdornment position="end">
              <IconButton
                aria-label="inverti visibilita' password"
                onClick={() => setShowPassword(!showPassword)}
                edge="end"
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          )
        }
      />
    </FormControl>
  );
};

export default TextField;
