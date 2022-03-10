import React, {useState} from 'react';
import {Field, Formik} from 'formik';
import RegistrationInput from '../Inputs/RegistrationInput';
import SubmitButton from '../Buttons/SubmitButton';
import * as yup from 'yup';
import RegistrationPhoneInput from '../Inputs/RegistrationPhoneInput';
import {View} from 'react-native';
import TermsOfUseField from '../Fields/TermsOfUseField';
import sendEmail from '../../constants/api/sendEmail';
import saveInJson from '../../constants/api/saveInJson';

export default () => {
  const [loading, setLoading] = useState(false);

  const signUpValidationScheme = yup.object().shape({
    phoneNumber: yup
      .string()
      .min(7, 'Введите корректный номер телефона')
      .max(16, 'Введите корректный номер телефона')
      .matches(/^[\d ]{9,16}/, 'Введите корректный номер телефона')
      .required('Введите корректный номер телефона'),
    email: yup
      .string()
      .min(10, 'Введите корректный емэйл')
      .max(30, 'Введите корректный емэйл')
      .email('Введите корректный емэйл')
      .required('Введите корректный емэйл'),
    name: yup
      .string()
      .min(3, 'Введите нормальное имя')
      .max(10, 'Введите нормальное имя')
      .matches(/^[A-ЯЁ][а-яё]/, 'Введите нормальное имя')
      .required('Введите нормальное имя'),
    terms: yup.bool().oneOf([true], ''),
  });
  const onSubmit = async values => {
    try {
      await saveInJson(values);
      await sendEmail(
        'support@domen.ru',
        'Новая заявка',
        `    Имя - ${values.name}
    Телефон - ${values.phoneNumber}
    Емэймл - ${values.email}`,
      );
    } catch (err) {
      alert(err.message);
    }
    await setLoading(false);
  };
  return (
    <View>
      <Formik
        initialValues={{
          name: '',
          email: '',
          phoneNumber: '',
          terms: true,
        }}
        onSubmit={onSubmit}
        validationSchema={signUpValidationScheme}
        validateOnMount={true}>
        {({handleSubmit, values, setFieldValue, isValid}) => (
          <>
            <Field
              {...{component: RegistrationInput, name: 'name', title: 'Имя'}}
            />
            <Field
              {...{
                component: RegistrationInput,
                name: 'email',
                title: 'Email',
                keyboardType: 'email-address',
              }}
            />
            <Field
              {...{
                component: RegistrationPhoneInput,
                name: 'phoneNumber',
                title: 'Телефон',
                keyboardType: 'numeric',
              }}
            />
            <SubmitButton
              {...{handleSubmit, title: 'Далее', isValid, loading, setLoading}}
            />
            <TermsOfUseField
              {...{
                value: values.terms,
                onPress: () => setFieldValue('terms', !values.terms),
              }}
            />
          </>
        )}
      </Formik>
    </View>
  );
};
