import { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'tiny-slider/dist/tiny-slider.css';

import ContactSelectButton from 'components/Contact/SelectButton';
import Form from 'components/Form';
import Link from 'components/Link';
import Section from 'components/Section/Section';
import SectionHeading from 'components/Section/Heading/Heading';

import useContactForm from 'hooks/useContactForm';
// import usePageData from 'hooks/usePageData';

import general from 'content/general.yml';

const Contact = ({ netlify }) => {
  // const pageData = usePageData();

  const {
    contactForm, formRef, set, submit, valid,
  } = useContactForm();

  const [ container, setContainer ] = useState(null);
  const [ tns, setTns ] = useState(null);
  const slider = useRef();

  useEffect(() => {
    (async () => {
      const imported = (await import('tiny-slider/src/tiny-slider')).tns;
      setTns(() => imported);
    })();
  });

  useEffect(() => {
    if (!netlify && container && tns) {
      slider.current = tns({
        autoHeight: true,
        center: true,
        container,
        gutter: 0,
        items: 1,
        lazyload: true,
        mouseDrag: false,
        nav: false,
        touch: false,

        // This option triggers a Lighthouse warning "Does not use passive
        // listeners to improve scrolling performance", but that's likely an
        // error by Lighthouse. The handlers for this option are supposed to stop
        // scrolling, so they can't be passive. Lighthouse is supposed to filter
        // out handlers that call e.preventDefault(), but that's clearly not
        // happening.
        preventScrollOnTouch: 'auto',
      });
    }
  }, [ container, netlify, tns ]);

  return (
    <Section
      className="contact"
      id="contact"
    >
      <div className="container">
        <div className="form-group">
          <FontAwesomeIcon
            className="contact__bg"
            icon="fa-solid fa-envelope-open-text"
          />
        </div>

        <Form
          id="contactForm"
          name="contactForm"
          netlify={ netlify }
          onSubmit={ event => {
            submit(event);
            slider.current.goTo(4);
          } }
          ref={ formRef }
        >
          <div className="row">
            <div className="col-lg-12">
              <div
                className="contact__steps"
                ref={ el => {
                  if (el && el !== container) {
                    setContainer(el);
                  }
                } }
              >
                <div className="contact__step">
                  <SectionHeading>
                    Em que podemos ajudar?
                  </SectionHeading>

                  <div className="contact__select-buttons">
                    <ContactSelectButton
                      className="contact__step__objective"
                      name="objectivo"
                      onClick={ () => slider.current.goTo(1) }
                      value="contrução"
                    >
                      Construção de jardim
                    </ContactSelectButton>

                    <ContactSelectButton
                      className="contact__step__objective"
                      name="objectivo"
                      onClick={ () => slider.current.goTo(1) }
                      value="manutenção"
                    >
                      Manutenção de jardim
                    </ContactSelectButton>
                  </div>
                </div>

                <div className="contact__step">
                  <SectionHeading>
                    Qual é a área do jardim?
                  </SectionHeading>

                  <div className="contact__select-buttons">
                    <ContactSelectButton
                      className="contact__step__area"
                      name="area"
                      onClick={ () => slider.current.goTo(2) }
                      value="-50"
                    >
                      { '< 50m2' }
                    </ContactSelectButton>

                    <ContactSelectButton
                      className="contact__step__area"
                      name="area"
                      onClick={ () => slider.current.goTo(2) }
                      value="50-100"
                    >
                      50m2 a 100m2
                    </ContactSelectButton>

                    <ContactSelectButton
                      className="contact__step__area"
                      name="area"
                      onClick={ () => slider.current.goTo(2) }
                      value="100-500"
                    >
                      100m2 a 500m2
                    </ContactSelectButton>

                    <ContactSelectButton
                      className="contact__step__area"
                      name="area"
                      onClick={ () => slider.current.goTo(2) }
                      value="500+"
                    >
                      { '> 500m2' }
                    </ContactSelectButton>
                  </div>

                  <div className="contact__actions">
                    <button
                      className="contact__back-btn btn btn-lg btn-primary"
                      onClick={ () => slider.current.goTo(0) }
                      type="button"
                    >
                      Voltar atrás
                    </button>
                  </div>
                </div>

                <div className="contact__step">
                  <SectionHeading>
                    Quais os dados de contacto?
                  </SectionHeading>

                  <div className="form-group">
                    <input
                      className="form-control"
                      id="name"
                      name="nome"
                      onChange={ set }
                      placeholder="* Nome"
                      required
                      value={ contactForm.nome }
                      type="text"
                    />
                    <label htmlFor="name">Nome</label>

                    <input
                      className="form-control"
                      id="email"
                      name="email"
                      onChange={ set }
                      placeholder="* Email"
                      required
                      value={ contactForm.email }
                      type="email"
                    />
                    <label htmlFor="email">Email</label>
                  </div>

                  <div className="form-group">
                    <input
                      className="form-control"
                      id="phone"
                      name="telefone"
                      onChange={ set }
                      placeholder="* Contacto telefónico"
                      required
                      value={ contactForm.telefone }
                      type="tel"
                    />
                    <label htmlFor="phone">Contacto telefónico</label>

                    <input
                      className="form-control"
                      id="address"
                      name="morada"
                      onChange={ set }
                      placeholder="* Morada"
                      required
                      value={ contactForm.morada }
                      type="text"
                    />
                    <label htmlFor="address">Morada</label>
                  </div>

                  <div className="form-group contact__checkboxes">
                    <div className="contact__checkboxes__item custom-control custom-checkbox">
                      <input
                        checked={ contactForm['consentimento submissão'] }
                        className="form-check-input custom-control-input"
                        id="consent"
                        name="consentimento submissão"
                        onChange={ set }
                        required
                        type="checkbox"
                      />
                      <label
                        className="form-check-label custom-control-label contact__checkbox-label"
                        htmlFor="consent"
                      >
                        * Compreendo que os dados submetidos serão tratados de acordo com a
                        política de privacidade da Planta&Corta.
                      </label>
                    </div>

                    <div className="contact__checkboxes__item custom-control custom-checkbox">
                      <input
                        checked={ contactForm['subscrever marketing'] }
                        className="form-check-input custom-control-input"
                        name="subscrever marketing"
                        onChange={ set }
                        id="marketing"
                        type="checkbox"
                      />
                      <label
                        className="form-check-label custom-control-label contact__checkbox-label"
                        htmlFor="marketing"
                      >
                        Quero receber campanhas de marketing, promoções, e novidades sobre a
                        actividade da Planta&Corta.
                      </label>
                    </div>

                    <div className="contact__note">
                      * Campos obrigatórios
                    </div>
                  </div>

                  <div className="contact__actions">
                    <button
                      className="contact__back-btn btn btn-lg btn-primary"
                      onClick={ () => slider.current.goTo(1) }
                      type="button"
                    >
                      Voltar atrás
                    </button>

                    <button
                      className="contact__submit btn btn-primary btn-lg"
                      disabled={ !valid }
                      onClick={ () => {
                        slider.current.goTo(3);
                      } }
                      type="button"
                    >
                      Continuar
                    </button>
                  </div>

                </div>

                <div className="contact__step">
                  <SectionHeading>
                    Mais alguma informação pertinente?
                  </SectionHeading>

                  <div className="form-group">
                    <textarea
                      className="form-control"
                      id="message"
                      name="mensagem"
                      onChange={ set }
                      placeholder="Mensagem"
                      value={ contactForm.mensagem }
                    />
                    <label htmlFor="message">Mensagem</label>
                  </div>

                  <div className="contact__actions">
                    <button
                      className="contact__back-btn btn btn-lg btn-primary"
                      onClick={ () => slider.current.goTo(2) }
                      type="button"
                    >
                      Voltar atrás
                    </button>

                    <button
                      className="contact__submit btn btn-primary btn-lg"
                      disabled={ !valid || contactForm.status === 'submitting' }
                      type="submit"
                    >
                      Pedir Orçamento
                    </button>
                  </div>
                </div>

                <div className="contact__step">
                  { contactForm.status === 'submitting' && (
                    <div className="contact__success">
                      A submeter...
                    </div>
                  ) }

                  { contactForm.status === 'success' && (
                    <div className="contact__success">
                      Obrigado pela sua mensagem! Entraremos em contacto assim que possível.
                    </div>
                  ) }

                  { contactForm.status === 'error' && (
                    <div className="contact__error">
                      Ocorreu um erro! Por favor tente outra vez, ou contacte-nos diretamente
                      através de email.

                      <button
                        className="contact__submit btn btn-primary btn-lg"
                        onClick={ () => slider.current.goTo(0) }
                        type="button"
                      >
                        Tentar Novamente
                      </button>
                    </div>
                  ) }
                </div>
              </div>
            </div>
          </div>
        </Form>

        <div className="row">
          <div className="contacts-url col-lg-12 text-center">
            { !!general.contact_address && (
              <div className="contacts-url__address">
                <Link to={ general.contact_map }>
                  <FontAwesomeIcon icon="fa-solid fa-map-location-dot" />
                  { general.contact_address }
                </Link>
              </div>
            ) }

            { !!general.contact_phone && (
              <div className="contacts-url__phone">
                <Link to={ `tel:${general.contact_phone.replace(/ /g, '')}` }>
                  { `${general.contact_phone} (Chamada para rede móvel nacional)` }
                </Link>
              </div>
            ) }

            { !!general.contact_email && (
              <div className="contacts-url__email">
                <Link to={ `mailto:${general.contact_email}` }>
                  { general.contact_email }
                </Link>
              </div>
            ) }
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Contact;
