import { FormControlLabel, Switch, TextField } from "@mui/material";
import { formInputType } from "../../types";

type propTypes = {
  title: string;
  inputs: formInputType[];
  changeHandler: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    category: "incomes" | "deductions",
    index: number
  ) => void;
  category: "incomes" | "deductions";
};

  // this component uses an object array for displayng inputs according and states used are controlled by parent 
function Form(props: propTypes) {
  const { title, inputs, changeHandler, category } = { ...props };

  return (
    <div className="formcard">
      <h4 className="formcard__head">{title}</h4>
      <form className="form__details column--vcenter">
        {inputs.map((ele, index) => {
          let final;
          if (ele.type === "numeric") {
            final = (
              <TextField
                size="small"
                key={ele.id}
                label={ele.name}
                required={ele.required}
                helperText={ele.max !== null ? `max-${ele.max}` : ""}
                value={ele.value}
                disabled={ele.disabled}
                onChange={(e) => {
                  changeHandler(e, category, index);
                }}
                error={ele.error}
              />
            );
          } else if (ele.type === "checkbox") {
            final = (
              <FormControlLabel
                key={ele.id}
                control={
                  <Switch
                    checked={ele.value === "checked"}
                    onChange={(e) => {
                      changeHandler(e, category, index);
                    }}
                  />
                }
                label={ele.name}
              />
            );
          }
          return final;
        })}
      </form>
    </div>
  );
}

export default Form;
