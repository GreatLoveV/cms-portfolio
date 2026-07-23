import { useState, type ChangeEvent } from "react";

const useField = (type: string, init: string = "") => {
  const [value, setValue] = useState(init);

  const onChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
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
