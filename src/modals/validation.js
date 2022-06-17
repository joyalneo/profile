import * as Yup from 'yup'

const PasswordValidationSchema = () =>
  Yup.object().shape({
    password: Yup.string()
      .required('Passwrd cannot be blank')
      .matches(/^.{6,}$/, 'Password should contain atleast 6 characters.'),
    confirmPassword: Yup.string()
      .required('confirm password cannot be blank')
      .oneOf(
        [Yup.ref('password'), null],
        'Passwords and confirm password should match'
      ),
  })

export default PasswordValidationSchema
