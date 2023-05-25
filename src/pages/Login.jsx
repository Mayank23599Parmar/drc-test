import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { DynamicInput } from '../components/DynamicForm';
import { regex } from '../utils/regex';
import data from '../constants/Form.json';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setLoggedUserData } from '../redux/user/userActions';
const INITIAL_STATE = {
  email: '',
  password: '',
};

// Login page
export default function Login() {
  // Inits
  const dispatch = useDispatch();
  let userData = useSelector((state) => state.user.userData);
  const { loginFields } = data;
  const [loginData, setLoginData] = useState(INITIAL_STATE);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // calls when user do some change in input field
  const handleUserDataChange = (event) => {
    const { name, value } = event.target;
    setLoginData((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
    setErrors((prevState) => {
      return {
        ...prevState,
        [name]: '',
      };
    });
  };

  // For validate the form
  const validateForm = () => {
    let isValid = true;
    for (const [key, value] of Object.entries(loginData)) {
      // For email id
      if (key === 'email') {
        isValid = regex.email.test(value);
        if (!isValid) {
          setErrors((prevState) => {
            return {
              ...prevState,
              [key]: 'please enter the valid email id',
            };
          });
        }
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
    }
    return isValid;
  };

  //Handling the form submission
  const formSubmitHandler = async (event) => {
    try {
      event.preventDefault();
      const isValid = validateForm();
      if (isValid) {
        const data = userData.find((cv) => {
          if (
            cv.email === loginData.email &&
            cv.password === loginData.password
          ) {
            return cv;
          }
        });
        if (Object.keys(data || {})?.length > 0) {
          dispatch(setLoggedUserData(data));
          toast.success('Login done successfully');
          navigate('/');
        } else {
          toast.error('Please enter valid email and password');
        }
      }
    } catch (err) {
      toast.error('Something went wrong');
      console.log(err);
    }
  };

  // JSX
  return (
    <div className="relative p-6 flex flex-col justify-center min-h-screen overflow-hidden">
      <div className="max-w-[550px] w-full p-6  m-auto bg-white rounded-md shadow-xl shadow-rose-600/40  ring-2 ring-purple-600 lg:max-w-xl">
        <h1 className="text-3xl font-semibold text-center text-purple-700 underline uppercase decoration-wavy">
          Sign in
        </h1>

        <form className="mt-6" onSubmit={formSubmitHandler}>
          {loginFields.map((singleFieldData, index) => {
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
              Login
            </button>
          </div>
        </form>

        <p className="mt-8 text-xs font-light text-center text-gray-700 ">
          Don't have an account?
          <Link
            to="/register"
            className="font-medium text-purple-600 hover:underline ml-1"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
