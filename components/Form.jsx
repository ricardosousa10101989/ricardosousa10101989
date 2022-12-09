import { forwardRef } from 'react';

const Form = forwardRef(({ children, name, ...props }, ref) => {
  if (process.env.NETLIFY_LOCAL) {
    return (
      <form
        { ...props }
        name={ name }
        // eslint-disable-next-line react/no-unknown-property
        netlify=""
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
  }

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
