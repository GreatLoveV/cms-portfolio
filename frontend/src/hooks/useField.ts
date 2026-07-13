import { useState, type ChangeEvent } from "react";

const useField = (type: string) => {
  const [value, setValue] = useState("");

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const reset = () => {
    setValue("");
  };
  return {
    inputProps: {
      value,
      onChange,
      type,
    },
    reset,
  };
};

export default useField;
