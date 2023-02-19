import { useCallback } from 'react';
import { createGlobalState } from 'react-hooks-global-state';

const { getGlobalState, setGlobalState, useGlobalState } = createGlobalState({
  contactForm: {
    area: '',
    'consentimento submissão': false,
    email: '',
    mensagem: '',
    morada: '',
    nome: '',
    objectivo: '',
    status: '',
    'subscrever marketing': false,
    telefone: '',
  },
  valid: false,
});

const formRef = {
  current: null,
};

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
  const [ valid, setValid ] = useGlobalState('valid');

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
    if (!formRef.current.morada.checkValidity()) {
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
  }, [ valid, setValid ]);

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
    const formData = new URLSearchParams(new FormData(formRef.current));

    // It appends objectivo twice, for reasons...
    formData.delete('objectivo');
    formData.delete('area');
    formData.append('objectivo', contactForm.objectivo);
    formData.append('area', contactForm.area);

    // Massage for Freshsales
    formData.delete('subscrever marketing');
    formData.append('subscrever marketing', contactForm['subscrever marketing'] ? '1' : '0');

    fetch('/', {
      body: formData.toString(),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      method: 'POST',
    })
      .then(result => {
        set({
          name: 'status',
          value: result?.ok ? 'success' : 'error',
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
  }, [ contactForm, set, validate ]);

  return {
    contactForm, formRef, set, submit, valid,
  };
};

export default useContactForm;
