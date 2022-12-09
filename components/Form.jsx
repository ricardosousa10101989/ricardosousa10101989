import { forwardRef } from 'react';

// eslint-disable-next-line arrow-body-style
const Form = forwardRef(({ children, name, ...props }, ref) => {
  return (
    <form
      { ...props }
      method="post"
      name={ name }
      ref={ ref }
    >
      <input
        name="form-name"
        type="hidden"
        value={ name }
      />
      { children }
    </form>
  );
});

export default Form;
