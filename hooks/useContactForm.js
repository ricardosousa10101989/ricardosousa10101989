import { useCallback, useRef, useState } from 'react';
import { createGlobalState } from 'react-hooks-global-state';

const { getGlobalState, setGlobalState, useGlobalState } = createGlobalState({
  contactForm: {
    'consentimento submissão': false,
    email: '',
    mensagem: '',
    nome: '',
    status: '',
    'subscrever marketing': false,
    telefone: '',
  },
});

const getInputValue = input => {
  switch (input.type) {
    case 'checkbox':
      return input.checked;

    default:
      return input.value;
  }
};

const useContactForm = () => {
  const [ contactForm ] = useGlobalState('contactForm');
  const [ valid, setValid ] = useState(false);
  const formRef = useRef();

  const validate = useCallback(() => {
    let newValid = true;

    if (!formRef.current.nome.checkValidity()) {
      newValid = false;
    }
    if (!formRef.current.email.checkValidity()) {
      newValid = false;
    }
    if (!formRef.current.telefone.checkValidity()) {
      newValid = false;
    }
    if (!formRef.current['consentimento submissão'].checkValidity()) {
      newValid = false;
    }
    if (!formRef.current['subscrever marketing'].checkValidity()) {
      newValid = false;
    }

    if (newValid !== valid) {
      setValid(newValid);
    }

    return newValid;
  }, [ valid ]);

  const set = useCallback(input => {
    if ('target' in input) {
      setGlobalState('contactForm', {
        ...getGlobalState('contactForm'),
        [input.target.name]: getInputValue(input.target),
      });
    }
    else if ('name' in input) {
      setGlobalState('contactForm', {
        ...getGlobalState('contactForm'),
        [input.name]: input.value,
      });
    }

    validate();
  }, [ validate ]);

  const submit = useCallback(event => {
    if (event) {
      event.preventDefault();
    }

    if (!validate()) {
      return;
    }

    set({
      name: 'status',
      value: 'submitting',
    });

    const { FormData, URLSearchParams } = window;

    const formData = new FormData(formRef.current);
    formData.append('form-name', formRef.current.getAttribute('name'));

    const body = new URLSearchParams(formData).toString();

    fetch('/', {
      body,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      method: 'POST',
    })
      .then(() => {
        set({
          name: 'status',
          value: 'success',
        });
      })
      .catch(error => {
        // eslint-disable-next-line no-console
        console.error(error);
        set({
          name: 'status',
          value: 'error',
        });
      });
  }, [ set, validate ]);

  return {
    contactForm, formRef, set, submit, valid,
  };
};

export default useContactForm;
