import React from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import categories from "api/categories";
import TextField from "./TextField";
import useStyles from "./styles";

type Props = {
  form: RegUserForm;
  handleChange: (event: React.ChangeEvent<MuiEvent>) => void;
  label: string;
  name: string;
};

const StatusSwitch: React.FC<Props> = ({ form, handleChange, label, name }: Props) => {
  const classes = useStyles();

  type FormKey = keyof typeof form;

  const isChecked = form[name as FormKey] as boolean;

  return (
    <>
      <FormControlLabel
        control={<Switch checked={isChecked} onChange={handleChange} name={name} color="primary" />}
        label={label}
        className={classes.field}
      />
      {isChecked && (
        <>
          <TextField
            handleChange={handleChange}
            type="text"
            label="Di cosa vorresti parlare / Chi vuoi conoscere?"
            name="topicTitle"
            value={form.topicTitle}
            required
          />
          <FormControl variant="filled" required className={classes.field} fullWidth>
            <InputLabel id="topicCategory">Categoria</InputLabel>
            <Select labelId="topicCategory" name="topicCategory" value={form.topicCategory} onChange={handleChange}>
              <MenuItem value="">
                <em>Scegli una categoria</em>
              </MenuItem>
              {categories.map((category, index) => (
                <MenuItem key={index} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </>
      )}
    </>
  );
};

export default StatusSwitch;
