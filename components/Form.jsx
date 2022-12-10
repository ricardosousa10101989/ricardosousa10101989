import { forwardRef } from 'react';

const Form = forwardRef(({
  children, name, netlify, ...props
// eslint-disable-next-line arrow-body-style
}, ref) => {
  return (
    <form
      { ...props }
      method="post"
      name={ name }
      // eslint-disable-next-line react/no-unknown-property
      netlify={ netlify ? '' : undefined }
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
