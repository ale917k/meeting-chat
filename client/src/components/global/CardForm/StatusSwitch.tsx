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

/**
 * Switch for user status; If set on true, enable fields for creating new conversation.
 * @param {object} form - Controlled state with switch and hidden fields values.
 * @param {function} handleChange - Hook function for updating controlled inputs.
 * @param {string} label - Element label.
 * @param {string} name - Element name property.
 */
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
