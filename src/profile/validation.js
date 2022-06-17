import * as Yup from 'yup'

const ProfileValidationSchema = () =>
  Yup.object().shape({
    email: Yup.string()
      .required('Email cannot be blank')
      .matches(/^[a-z0-9-]*$/, 'Email should be in correct format'),
    name: Yup.string().required('Name cannot be blank'),
    password: Yup.string().required('Name cannot be blank'),
    confirmPassword: Yup.string().required('Name cannot be blank'),
  })

export default ProfileValidationSchema
