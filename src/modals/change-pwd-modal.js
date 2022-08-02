import React, { useState, useRef } from 'react';
import { Formik } from 'formik';
import Axios from 'axios';
import { toast } from 'react-toastify';
import { shield } from 'yah-js-sdk';
import PropTypes from 'prop-types';
import AuthLogo from '../assets/img/logo-auth.svg';
import IconError from '../assets/img/icons/icon-error.svg';
import CloseIcon from '../assets/img/icons/close-icon.svg';
import EyeIcon from '../assets/img/icons/eye-icon.svg';
import EyeIconActive from '../assets/img/icons/eye-icon-active.svg';
import PasswordValidationSchema from './validation.js';
import Toast from '../toast/Toast.js';

const initialValues = { password: '', confirmPassword: '' };

const ChangePwdModal = (props) => {
  const { hasPwdModal, handleHasPwdModal, setHasPwdModal } = props;
  const [pwdVisibility, setPwdVisibility] = useState(false);
  const [pwdVisibility2, setPwdVisibility2] = useState(false);
  const formikRef = useRef(null);

  const changePassword = async (values) => {
    const requestData = new FormData();
    requestData.append('password', values.password);
    requestData.append('passwordRe', values.confirmPassword);
    const token = shield.tokenStore.getToken();
    try {
      const { data } = await Axios.post(
        `https://shield.appblox.io/change-user-password`,
        requestData,
        token && {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(data.message);
      setHasPwdModal(false);
    } catch (error) {
      // setDetails(null)
      toast.error(error.response.data.msg);
    }
  };

  const onSubmit = (values) => {
    changePassword(values);
    formikRef?.current?.resetForm(initialValues);
  };
  const onChange = (data) => {
    // console.log(data,"onchangedata")
    formikRef?.current?.setFieldValue(data.target.name, data.target.value);
  };

  return (
    <>
      {' '}
      <Toast />
      <Formik
        innerRef={formikRef}
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={PasswordValidationSchema()}
        validateOnMount
        validateOnChange
        validateOnBlur
        enableReinitialize
      >
        {({ handleSubmit, values, errors, touched, resetForm }) => (
          <div
            className={`fixed left-0 top-0 z-[999] h-full w-full ${
              hasPwdModal ? 'fadeIn' : 'hidden'
            }`}
          >
            <div
              onClick={() => {
                handleHasPwdModal();
              }}
              className='fixed left-0 top-0 z-[999] h-full w-full bg-black/40'
            />
            <div
              className={`transition-max-width absolute top-1/2 left-1/2 z-[1000] w-full max-w-[522px] -translate-x-1/2 -translate-y-1/2 transform px-4 duration-200 ${
                hasPwdModal ? '' : 'hidden'
              }`}
            >
              <div className='w-full max-w-[344px] sm:mx-auto bg-white sm:rounded-2xl min-h-full sm:min-h-0 py-8 px-6 clearfix'>
                <div className='w-full float-left flex flex-col items-center'>
                  <img src={AuthLogo} alt='' width='28px' height='36px' />
                  <div className='text-xl font-light mt-3'>Change Password</div>
                </div>
                <div className='w-full float-left pt-8 pb-6 px-6 rounded-2xl border-primary border mt-5'>
                  <div className='error-msg-wrapper error-msg-border error-msg-bg w-full mb-5 border py-4 items-center rounded-md flex justify-between px-3 hidden'>
                    <div className='flex'>
                      <img
                        className='mr-2'
                        src={IconError}
                        width='13px'
                        height='13px'
                        alt=''
                      />
                      <div
                        id='error-msg'
                        className='text-xs text-gray-dark tracking-tighter capitalize'
                      >
                        Incorrect Username/Password.
                      </div>
                    </div>
                    <div className='flex-shrink-0 cursor-pointer'>
                      <img src={CloseIcon} width='8px' height='8px' alt='' />
                    </div>
                  </div>

                  <form className='frm-container w-full float-left mb-0'>
                    <div className='flex flex-col mb-3'>
                      <label className='font-semibold text-sm text-gray-dark'>
                        New Password*
                      </label>
                      <div className='w-full relative'>
                        <input
                          id='password'
                          name='password'
                          onChange={onChange}
                          value={values.password}
                          className={`w-full px-2 pr-7 h-8 border rounded-md focus:outline-none bg-white text-sm ${
                            touched.password && errors.password
                              ? 'border-[#CB2431]'
                              : 'border-primary'
                          } `}
                          type={!pwdVisibility ? 'password' : 'text'}
                        />
                        <img
                          onClick={() => setPwdVisibility(!pwdVisibility)}
                          alt=''
                          src={!pwdVisibility ? EyeIcon : EyeIconActive}
                          className='absolute w-4 h-full top-0 right-1.5 cursor-pointer'
                        />
                        <span
                          style={{ fontSize: '10px' }}
                          className='absolute  text-[#CB2431] top-full left-0'
                        >
                          {touched.password && errors.password}
                        </span>
                      </div>
                    </div>
                    <div className='flex flex-col mb-3'>
                      <label className='font-semibold text-sm text-gray-dark'>
                        Re-enter Password*
                      </label>
                      <div className='w-full relative'>
                        <input
                          id='password-re'
                          name='confirmPassword'
                          onChange={onChange}
                          value={values.confirmPassword}
                          className={`w-full px-2 pr-7 h-8 border rounded-md focus:outline-none bg-white text-sm ${
                            touched.confirmPassword && errors.confirmPassword
                              ? 'border-[#CB2431]'
                              : 'border-primary'
                          } `}
                          type={!pwdVisibility2 ? 'password' : 'text'}
                        />
                        <img
                          onClick={() => setPwdVisibility2(!pwdVisibility2)}
                          src={!pwdVisibility2 ? EyeIcon : EyeIconActive}
                          className='absolute w-4 h-full top-0 right-1.5 cursor-pointer'
                          alt=''
                        />
                        <span
                          style={{ fontSize: '10px' }}
                          className='absolute text-[#CB2431] top-full left-0'
                        >
                          {touched.confirmPassword && errors.confirmPassword}
                        </span>
                      </div>
                    </div>
                    <div className='flex flex-col button-wrapper w-full items-center'>
                      <button
                        type='button'
                        onClick={handleSubmit}
                        className='w-full rounded-md text-white h-8 focus:outline-none mt-2 font-semibold text-sm transition-all bg-primary bg-primary-hover'
                      >
                        Change Password
                      </button>
                      <button
                        onClick={() => {
                          handleHasPwdModal();
                          resetForm();
                        }}
                        type='button'
                        className='rounded-md text-gray-light h-8 focus:outline-none mt-4 font-semibold text-sm transition-all hover:text-[#24292E]'
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
      </Formik>
    </>
  );
};
ChangePwdModal.propTypes = {
  hasPwdModal: PropTypes.bool.isRequired,
  handleHasPwdModal: PropTypes.func.isRequired,
  setHasPwdModal: PropTypes.func.isRequired,
};

export default ChangePwdModal;
