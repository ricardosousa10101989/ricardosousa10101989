import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Form from 'components/Form';
import Link from 'components/Link';
import Section from 'components/Section/Section';
import SectionHeading from 'components/Section/Heading/Heading';

import useContactForm from 'hooks/useContactForm';
import usePageData from 'hooks/usePageData';

const Contact = ({ netlify }) => {
  const pageData = usePageData();

  const {
    contactForm, formRef, set, submit, valid,
  } = useContactForm();

  return (
    <Section
      className="contact"
      id="contact"
    >
      <div className="container">
        <FontAwesomeIcon
          className="contact__bg"
          icon="fa-solid fa-envelope-open-text"
        />

        <div className="row">
          <div className="col-lg-12 text-center">
            <SectionHeading>{ pageData?.contact_title }</SectionHeading>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-12">
            <Form
              id="contactForm"
              name="contactForm"
              netlify={ netlify ? '' : undefined }
              onSubmit={ submit }
              ref={ formRef }
            >
              <div className="row">
                <div className="col-md-6">
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
                  </div>

                  <div className="form-group">
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
                  </div>
                </div>

                <div className="col-md-6">
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
                </div>

                <div className="col-lg-12 text-center">
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
                  </div>

                  <div className="contact__note">
                    * Campos obrigatórios
                  </div>

                  { contactForm.status === 'success' && (
                    <div className="contact__success">
                      Obrigado pela sua mensagem! Entraremos em contacto assim que possível.
                    </div>
                  ) }

                  { contactForm.status === 'error' && (
                    <div className="contact__error">
                      Ocorreu um erro! Por favor tente outra vez, ou contacte-nos diretamente
                      através de email.
                    </div>
                  ) }

                  { (contactForm.status !== 'success') && (
                    <button
                      className="contact__submit btn btn-primary btn-lg"
                      disabled={ !valid || contactForm.status === 'submitting' }
                      type="submit"
                    >
                      { contactForm.status === 'submitting' ? 'A enviar...' : 'Pedir Orçamento' }
                    </button>
                  ) }
                </div>
              </div>
            </Form>
          </div>
        </div>

        <div className="row">
          <div className="contacts-url col-lg-12 text-center">
            { !!pageData?.contact_address && (
              <div className="contacts-url__address">
                <Link to={ pageData.contact_map }>
                  { pageData.contact_address }
                </Link>
              </div>
            ) }

            { !!pageData?.contact_phone && (
              <div className="contacts-url__phone">
                <Link to={ `tel:${pageData.contact_phone.replace(/ /g, '')}` }>
                  { pageData.contact_phone }
                </Link>
              </div>
            ) }

            { !!pageData?.contact_email && (
              <div className="contacts-url__email">
                <Link to={ `mailto:${pageData.contact_email}` }>
                  { pageData.contact_email }
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
