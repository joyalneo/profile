import React, { useState, useRef, useEffect } from 'react';
import { Formik } from 'formik';
import { shield } from 'blox-js-sdk';
import Axios from 'axios';
import ChangePwdModal from '../modals/change-pwd-modal.js';
import avatarIcon from '../assets/img/profile-pic.svg';
import cameraIcon from '../assets/img/icons/camera.svg';
import GoogleIcon from '../assets/img/icons/google-icon.svg';
import TwitterIcon from '../assets/img/icons/twitter.svg';
import LinkedInIcon from '../assets/img/icons/linkedIn.svg';
import VerifiedIcon from '../assets/img/icons/verfied-icon.svg';
import ProfileValidationSchema from './validation.js';

const initialValues = { name: '', email: '', image: '' };

const Profile = () => {
  // const [state,setState]=useState('')
  const [picture, setPicture] = useState('');
  const [details, setDetails] = useState(null);
  const [authProvider, setAuthProvider] = useState([]);
  const [hasPwdModal, setHasPwdModal] = useState(false);

  const formikRef = useRef(null);
  const onSubmit = (values) => {
    console.log(values, 'vall');
  };

  const onChangePicture = (e) => {
    setPicture(URL.createObjectURL(e.target.files[0]));
  };
  const getUserDetials = async () => {
    const token = shield.tokenStore.getToken();
    try {
      const { data } = await Axios.get(
        `https://shield.appblox.io/get-user-details`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setDetails(data.data);
      setAuthProvider(data.data.provider);
    } catch (error) {
      setDetails(null);
      console.log(error);
    }
  };

  useEffect(() => {
    getUserDetials();
  }, []);

  return (
    <Formik
      innerRef={formikRef}
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={ProfileValidationSchema()}
      validateOnMount
      validateOnChange
      validateOnBlur
      enableReinitialize
    >
      {({ handleSubmit, values, errors, touched }) => (
        <div className='w-full float-left px-4 md:pr-8 lg:pr-20'>
          <div className='w-full float-left pt-6'>
            <div className='w-full flex flex-col md:flex-row md:space-x-6 items-start'>
              <div className='md-lt:w-full md:flex-grow overflow-hidden'>
                <div className='w-full float-left md:max-w-[622px]'>
                  <div className='w-full float-left bg-white md-lt:px-4 py-6 md:p-6 md:border border-primary rounded-2xl mb-5'>
                    <div className='text-gray-dark font-semibold text-2xl'>
                      Personal Details
                    </div>
                    <div className='w-full float-left mt-3'>
                      {details && (
                        <div className='w-[72px] h-[72px] float-left relative border border-black-500 rounded-full bg-[#F5F0FF] text-[#6F42C1]'>
                          {/* <img
                          className="w-full object-cover rounded-full"
                          src={picture || avatarIcon}
                          alt=""
                        />
                        <label className="cursor-pointer flex justify-center items-center absolute w-5 h-5 border border-primary bg-[#F6F8FA] rounded-full bottom-0 right-0">
                          <input
                            type="file"
                            onChange={onChangePicture}
                            className="hidden"
                            disabled
                          />
                          <img src={cameraIcon} alt="" />
                        </label> */}
                          <span className='flex justify-center items-center h-full text-4xl uppercase'>
                            {details?.full_name
                              .match(/(^\S\S?|\b\S)?/g)
                              .join('')
                              .match(/(^\S|\S$)?/g)
                              .join('')
                              .toUpperCase()}
                          </span>
                        </div>
                      )}
                      <div className='w-full float-left'>
                        <div className='w-full float-left mt-4'>
                          <label className='w-full float-left text-gray-dark text-base mb-1'>
                            Name
                          </label>
                          <input
                            disabled
                            value={details?.full_name || ''}
                            className='max-w-[370px] w-full h-10 mb-1 border border-primary bg-white rounded-md text-gray-dark text-sm px-2 focus:outline-none'
                          />
                          <p className='text-xs text-gray-light truncate'>
                            @{details?.user_name || ''}
                          </p>
                        </div>
                        <div className='w-full float-left mt-4'>
                          <label className='w-full float-left text-gray-dark text-base mb-1'>
                            Email
                          </label>
                          <input
                            disabled
                            value={details?.email || ''}
                            className='max-w-[370px] w-full h-10 mb-1 border border-primary bg-white rounded-md text-gray-dark text-sm px-2 focus:outline-none'
                          />
                          <p className='text-xs text-gray-light'>
                            Changing email requires verification.
                          </p>
                        </div>
                        <div className='w-full float-left mt-4 flex items-center'>
                          <label className='float-left text-gray-dark mb-1 text-base'>
                            Password
                          </label>
                          <button
                            type='button'
                            onClick={() => setHasPwdModal(true)}
                            className='flex items-center justify-center cursor-pointer text-center py-1 px-4 border border-[#1b1f2325] text-sm font-semibold text-gray-dark min-h-[32px] bg-gray-light hover:bg-gray-100 rounded-md ml-3'
                          >
                            Change Password
                          </button>
                        </div>
                        {/* <div className="w-full float-left flex items-center justify-end mb-2 md-lt:flex-wrap mt-6 space-x-4">
                            <button type="button" className="mt-2 flex-shrink-0 px-5 rounded-md text-gray-dark h-8 border border-primary focus:outline-none font-semibold text-sm bg-gray-light hover:bg-gray-100">Cancel</button>
                            <button type="button" className="mt-2 flex-shrink-0 px-5 rounded-md text-white h-8 focus:outline-none font-semibold text-sm transition-all bg-primary bg-primary-hover">Update</button>
                        </div> */}
                      </div>
                    </div>
                  </div>
                  <div className='w-full float-left bg-white md-lt:px-4 py-6 md:p-6 md:border border-primary rounded-2xl mb-5'>
                    <div className='text-gray-dark font-semibold text-2xl'>
                      Account Settings
                    </div>
                    {/* <div className="w-full float-left">
                                        <div className="w-full float-left pt-4 pb-5 border-b border-[#D1D5DA]">
                                            <div className="text-gray-light font-semibold text-sm">Connected providers</div>
                                            <div className="flex items-center mt-3">
                                                <div className="w-24 text-gray-dark text-xs flex-shrink-0 pr-2">GitHub</div>
                                                <div className="flex-grow overflow-hidden">
                                                    <button type="button" className="flex items-center text-sm text-gray-dark bg-[#F6F8FA] py-1 px-3.5 rounded-md border border-primary shadow-xs font-semibold"><img className="mr-1.5" src={GitIcon} alt="" />that-coder</button>
                                                </div>
                                            </div>
                                            <div className="flex items-center mt-3">
                                                <div className="w-24 text-gray-dark text-xs flex-shrink-0 pr-2">Gitlab</div>
                                                <div className="flex-grow overflow-hidden">
                                                    <button type="button" className="flex items-center text-sm text-gray-dark bg-[#F6F8FA] py-1 px-3.5 rounded-md border border-primary shadow-xs font-semibold"><img className="mr-1.5" src={GitlabIcon} alt="" />Connect Gitlab</button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="w-full float-left pt-4 pb-3">
                                            <div className="text-[#586069] font-semibold text-sm">Delete account</div>
                                            <div className="text-[#586069] text-xs mt-2.5">Account will be deleted with all data and cannot be recovered</div>
                                            <div className="w-full float-left flex items-center md-lt:flex-wrap mt-5 space-x-4">
                                                <button type="button" className="flex-shrink-0 px-5 rounded-md text-white h-8 focus:outline-none font-semibold text-sm transition-all bg-[#D73A49] hover:bg-[#eb4454]">Delete Account</button>
                                            </div>
                                        </div>
                                    </div> */}
                    <div className='w-full float-left'>
                      <div className='w-full float-left pt-4 pb-5 border-b border-[#D1D5DA]'>
                        <div className='w-full text-gray-light font-semibold text-sm mb-1 float-left'>
                          Connected Accounts
                        </div>
                        <div className='w-full flex items-center justify-between pl-3 pr-2 py-2 rounded-lg border border-primary mt-3 float-left'>
                          <div className='flex flex-grow overflow-hidden'>
                            <img
                              className='w-5 flex-shrink-0'
                              src={GoogleIcon}
                              alt='Google'
                            />
                            <p className='text-gray-dark font-semibold text-sm px-2 truncate'>
                              Google
                            </p>
                            {!authProvider?.includes('Google') && (
                              <img
                                className='flex-shrink-0'
                                src={VerifiedIcon}
                                alt='Verfied'
                              />
                            )}
                          </div>
                          <button
                            type='button'
                            disabled
                            className={`ml-2 min-w-[110px] flex-shrink-0 px-3 rounded-md h-8 focus:outline-none font-semibold text-sm transition-all ${
                              authProvider?.includes('Google')
                                ? 'text-gray-light'
                                : ' text-white bg-primary bg-primary-hover'
                            }`}
                          >
                            {authProvider?.includes('Google')
                              ? 'Disconnect'
                              : 'Connect'}
                          </button>
                        </div>
                        <div className='w-full flex items-center justify-between pl-3 pr-2 py-2 rounded-lg border border-primary mt-3 float-left'>
                          <div className='flex flex-grow overflow-hidden'>
                            <img
                              className='w-5 flex-shrink-0'
                              src={LinkedInIcon}
                              alt='LinkedIn'
                            />
                            <p className='text-gray-dark font-semibold text-sm px-2 truncate'>
                              LinkedIn
                            </p>
                            {!authProvider?.includes('LinkedIn') && (
                              <img
                                className='flex-shrink-0'
                                src={VerifiedIcon}
                                alt='Verfied'
                              />
                            )}
                          </div>
                          {/* className="ml-2 min-w-[110px] flex-shrink-0 px-3 rounded-md text-gray-light h-8 focus:outline-none !focus:border-none font-semibold text-sm transition-all" */}

                          <button
                            type='button'
                            disabled
                            className={`ml-2 min-w-[110px] flex-shrink-0 px-3 rounded-md h-8 focus:outline-none font-semibold text-sm transition-all ${
                              authProvider?.includes('LinkedIn')
                                ? 'text-gray-light'
                                : ' text-white bg-primary bg-primary-hover'
                            }`}
                          >
                            {authProvider?.includes('LinkedIn')
                              ? 'Disconnect'
                              : 'Connect'}
                          </button>
                        </div>
                        <div className='w-full flex items-center justify-between pl-3 pr-2 py-2 rounded-lg border border-primary mt-3 float-left'>
                          <div className='flex flex-grow overflow-hidden'>
                            <img
                              className='w-5 flex-shrink-0'
                              src={TwitterIcon}
                              alt='Twitter'
                            />
                            <p className='text-gray-dark font-semibold text-sm px-2 truncate'>
                              Twitter
                            </p>
                            {!authProvider?.includes('Twitter') && (
                              <img
                                className='flex-shrink-0'
                                src={VerifiedIcon}
                                alt='Verfied'
                              />
                            )}
                          </div>
                          <button
                            type='button'
                            disabled
                            className={`ml-2 min-w-[110px] flex-shrink-0 px-3 rounded-md h-8 focus:outline-none font-semibold text-sm transition-all ${
                              authProvider?.includes('Twitter')
                                ? 'text-gray-light'
                                : ' text-white bg-primary bg-primary-hover'
                            }`}
                          >
                            {authProvider?.includes('Twitter')
                              ? 'Disconnect'
                              : 'Connect'}
                          </button>
                        </div>
                      </div>
                      <div className='w-full float-left pt-4 pb-3'>
                        <div className='text-[#586069] font-semibold text-sm'>
                          Delete account
                        </div>
                        <div className='text-[#586069] text-xs mt-2.5'>
                          Account will be deleted with all data and cannot be
                          recovered
                        </div>
                        <div className='w-full float-left flex items-center md-lt:flex-wrap mt-5 space-x-4'>
                          <button
                            type='button'
                            className='flex-shrink-0 px-5 rounded-md text-white h-8 focus:outline-none font-semibold text-sm transition-all bg-[#D73A49] hover:bg-[#eb4454]'
                          >
                            Delete Account
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ChangePwdModal
            hasPwdModal={hasPwdModal}
            setHasPwdModal={setHasPwdModal}
            handleHasPwdModal={() => setHasPwdModal(false)}
          />
        </div>
      )}
    </Formik>
  );
};

export default Profile;
