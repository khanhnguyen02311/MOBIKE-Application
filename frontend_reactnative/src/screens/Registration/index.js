import {View, Text, Button} from 'react-native';
import React from 'react';
import {LOGIN} from '../../constants/routeNames';
import Container from '../../components/common/container';
import RegistrationComponent from '../../components/Registration';
import {
  ValidateEmail,
  ValidateUsername,
  ValidatePassword,
  ValidateConfirmPassword,
} from '../../utils/validateForm';

const Registration = ({navigation}) => {
  const [form, setForm] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [firstSubmit, setFirstSubmit] = React.useState(true);

  const onChange = ({name, value}) => {
    setForm({...form, [name]: value});
    if (!firstSubmit) {
      if (value !== '') {
        //email
        if (name === 'email') {
          setErrors(prev => {
            return {...prev, [name]: ValidateEmail(value)};
          });
        }

        //username
        else if (name === 'username') {
          setErrors(prev => {
            return {...prev, [name]: ValidateUsername(value)};
          });
        }

        //password
        else if (name === 'password') {
          setErrors(prev => {
            return {...prev, [name]: ValidatePassword(value)};
          });
        }

        //confirm password
        else if (name === 'confirmPassword') {
          setErrors(prev => {
            return {
              ...prev,
              [name]: ValidateConfirmPassword(form.password, value),
            };
          });
        }
      } else {
        setErrors(prev => {
          return {...prev, [name]: '* Please enter your ' + name};
        });
      }
    }
  };

  const onSubmit = () => {
    //validation
    console.log({form});
    setFirstSubmit(false);

    if (!form.email) {
      setErrors(prev => {
        return {...prev, email: '* Please enter your email'};
      });
    } else {
      setErrors(prev => {
        return {...prev, email: ValidateEmail(form.email)};
      });
    }

    if (!form.username) {
      setErrors(prev => {
        return {...prev, username: '* Please enter your username'};
      });
    } else {
      setErrors(prev => {
        return {...prev, username: ValidateUsername(form.username)};
      });
    }

    if (!form.password) {
      setErrors(prev => {
        return {...prev, password: '* Please enter your password'};
      });
    } else {
      setErrors(prev => {
        return {...prev, password: ValidatePassword(form.password)};
      });
    }

    if (!form.confirmPassword) {
      setErrors(prev => {
        return {
          ...prev,
          confirmPassword: '* Please enter your confirm password',
        };
      });
    } else {
      setErrors(prev => {
        return {
          ...prev,
          confirmPassword: ValidateConfirmPassword(
            form.password,
            form.confirmPassword,
          ),
        };
      });
    }
  };
  return (
    <RegistrationComponent
      onSubmit={onSubmit}
      onChange={onChange}
      form={form}
      errors={errors}
    />
  );
};

export default Registration;
