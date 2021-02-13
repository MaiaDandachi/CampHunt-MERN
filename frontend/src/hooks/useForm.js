import { useState, useCallback } from 'react';

export const useForm = (initialInputs) => {
  const [inputs, setInputs] = useState(initialInputs);

  const handleInputChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  // used for setting a specific value to a state.
  const handleInputValue = useCallback(
    (inputName, inputVal) => {
      setInputs((prevInputs) => ({
        ...prevInputs,
        [inputName]: inputVal,
      }));
    },
    [setInputs]
  );

  return {
    inputs,
    handleInputChange,
    handleInputValue,
  };
};
