import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { regex } from '../utils/regex';
import data from '../constants/Form.json';
import { DynamicInput } from '../components/DynamicForm';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { createUser } from '../redux/user/userActions';
const INITIAL_STATE = {
  userName: '',
  email: '',
  password: '',
};
const Register = () => {
  // Inits
  const dispatch = useDispatch();
  const { registerFields } = data;
  const [registrationFormData, setRegistrationFormData] =
    useState(INITIAL_STATE);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // calls when user do some change in input field
  const handleUserDataChange = (event) => {
    const { name, value } = event.target;
    setRegistrationFormData((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
    const errObj = { ...errors };
    delete errObj[name];
    setErrors(errObj);
  };

  // For validate the form
  const validateForm = () => {
    let isValid = true;
    for (const [key, value] of Object.entries(registrationFormData)) {
      // For user name
      if (key === 'userName') {
        if (value.length < 3) {
          setErrors((prevState) => {
            return {
              ...prevState,
              [key]: 'please enter the valid User name',
            };
          });
        }
      }

      // For email id
      if (key === 'email') {
        isValid = regex.email.test(String(value).toLowerCase());
        setErrors((prevState) => {
          return {
            ...prevState,
            [key]: 'please enter the valid email id',
          };
        });
      }

      // For password
      if (key === 'password') {
        if (value.length < 6) {
          isValid = false;
          setErrors((prevState) => {
            return {
              ...prevState,
              [key]: 'please enter the valid password',
            };
          });
        }
      }

      if (key === 'userName') {
        if (value.length < 3) {
          isValid = false;
          setErrors((prevState) => {
            return {
              ...prevState,
              [key]: 'please enter the valid User name',
            };
          });
        }
      }
    }
    return isValid;
  };

  //Handling the form submission
  const formSubmitHandler = async (event) => {
    try {
      event.preventDefault();
      const isValid = validateForm();
      if (isValid) {
        dispatch(
          createUser({
            ...registrationFormData,
            id: Math.floor(100000 + Math.random() * 900000),
          })
        );
        toast.success('Register done successfully');
        navigate('/login');
      }
    } catch (err) {
      toast.error('Something went wrong');
      console.log(err);
    }
  };

  return (
    <div className="relative p-6 flex flex-col justify-center min-h-screen overflow-hidden">
      <div className="max-w-[550px] w-full p-6  m-auto bg-white rounded-md shadow-xl shadow-rose-600/40  ring-2 ring-purple-600 lg:max-w-xl">
        <h1 className="text-3xl font-semibold text-center text-purple-700 underline uppercase decoration-wavy">
          Register
        </h1>
        <form className="mt-6" onSubmit={formSubmitHandler}>
          {registerFields.map((singleFieldData, index) => {
            return (
              <DynamicInput
                key={index}
                singleFieldData={singleFieldData}
                handleUserDataChange={handleUserDataChange}
                errors={errors}
              />
            );
          })}
          <div className="mt-6">
            <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
              Register
            </button>
          </div>
        </form>

        <p className="mt-8 text-xs font-light text-center text-gray-700 ">
          Have an account?
          <Link
            to="/login"
            className="font-medium text-purple-600 hover:underline ml-1"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
