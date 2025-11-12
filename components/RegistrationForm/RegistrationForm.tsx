'use client';

import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import css from './RegistrationForm.module.css';
import Container from '../Container/Container';
import Section from '../Section/Section';

interface RegistrationFormProps {
  onSubmit: (
    values: { name: string; email: string; password: string },
    formikHelpers: FormikHelpers<{ name: string; email: string; password: string }>
  ) => Promise<void>;
}

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Ім’я не може бути коротшим за 3 символи')
    .max(32, 'Ім’я не може бути довше 32 символів')
    .required('Ім’я обов’язкове'),
  email: Yup.string()
    .email('Некоректний email')
    .max(64, 'Email не може бути довше 64 символів')
    .required('Email обов’язковий'),
  password: Yup.string()
    .min(8, 'Пароль повинен бути не менше 8 символів')
    .max(128, 'Пароль не може бути довше 128 символів')
    .required('Пароль обов’язковий'),
});

export default function RegistrationForm({ onSubmit }: RegistrationFormProps) {
  return (
    <Section classes={["hero", "background"]}>
      <Container>
    <main className={css.mainContent}>
      <ul className={css.wrapper}>
        <li className={`${css.wrapperItem} ${css.wrapperItemBorder}`}>Реєстрація</li>
        <li className={css.wrapperItem}>Вхід</li>
      </ul>

      <h2 className={css.formTitle}>Реєстрація</h2>
      <p className={css.formText}>Раді Вас бачити у спільноті мандрівників!</p>

      <Formik
        initialValues={{ name: '', email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={async (values, formikHelpers) => {
          try {
            await onSubmit(values, formikHelpers);
          } finally {
            formikHelpers.setSubmitting(false);
          }
        }}
      >
        {({errors, touched, isSubmitting }) => (
          <Form className={css.form}>
            <div className={css.formGroup}>
              <label htmlFor="name">Ім'я та прізвище*</label>
              <Field id="name" name="name" type="text" placeholder="Ваше імʼя та прізвище"
                className={`${css.input} ${
                  errors.name && touched.name ? css.inputError : ''
                }`} />
              <ErrorMessage name="name" component="div" className={css.error} />
            </div>

            <div className={css.formGroup}>
              <label htmlFor="email">Пошта*</label>
              <Field id="email" name="email" type="email" placeholder="hello@podorozhnyky.ua"
                className={`${css.input} ${
                  errors.email && touched.email ? css.inputError : ''
                }`} />
              <ErrorMessage name="email" component="div" className={css.error} />
            </div>

            <div className={css.formGroup}>
              <label htmlFor="password">Пароль*</label>
              <Field id="password" name="password" type="password" placeholder="********"
                className={`${css.input} ${
                  errors.password && touched.password ? css.inputError : ''
                }`} />
              <ErrorMessage name="password" component="div" className={css.error} />
            </div>

            <div className={css.actions}>
              <button type="submit" className={css.submitButton} disabled={isSubmitting}>
                {isSubmitting ? 'Зареєструємо...' : 'Зареєструватись'}
              </button>
            </div>
          </Form>
        )}
      </Formik>
        </main>
         </Container>
    </Section>
  );
}
