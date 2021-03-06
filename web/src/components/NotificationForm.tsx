import styled from 'styled-components';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useEffect, useState } from 'react';
import {
  createNotification,
  getManagers,
} from '../services/NotificationFormService';
export interface NotificationFormFields {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  supervisor: string;
}

const NotificationForm = () => {
  const [supervisors, setSupervisors] = useState<string[]>([]);
  const [isPhoneChecked, setIsPhoneChecked] = useState<boolean>(false);
  const [isEmailChecked, setIsEmailChecked] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  useEffect(() => {
    getManagers()
      .then((response) => {
        setSupervisors(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    resetField,
    formState: { errors, isSubmitSuccessful },
  } = useForm<NotificationFormFields>({ mode: 'onBlur' });
  const onSubmit: SubmitHandler<NotificationFormFields> = (data) =>
    createNotification(data);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
      setIsEmailChecked(false);
      setIsPhoneChecked(false);
      setIsSuccess(true);
    }
  }, [isSubmitSuccessful, reset]);

  useEffect(() => {
    if (isEmailChecked === false) {
      resetField('email');
    }
  }, [isEmailChecked, resetField]);

  useEffect(() => {
    if (isPhoneChecked === false) {
      resetField('phoneNumber');
    }
  }, [isPhoneChecked, resetField]);

  return (
    <>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <StyledFormFieldContainer>
          <StyledFormInputWrapper>
            <label>First Name</label>
            <StyledFormInput
              {...register('firstName', {
                required: { value: true, message: 'First name is required' },
                pattern: {
                  value: /^[A-Za-z]+$/i,
                  message: 'Please, only use letters',
                },
              })}
            />
            <StyledFormError>
              {errors.firstName && errors.firstName.message}
            </StyledFormError>
          </StyledFormInputWrapper>

          <StyledFormInputWrapper>
            <label>Last Name</label>
            <StyledFormInput
              {...register('lastName', {
                required: { value: true, message: 'Last name is required' },
                pattern: {
                  value: /^[A-Za-z]+$/i,
                  message: 'Please, only use letters',
                },
              })}
            />

            <StyledFormError>
              {errors.lastName && errors.lastName.message}
            </StyledFormError>
          </StyledFormInputWrapper>

          <StyledFormHeading>
            How would you prefer to be notified?
          </StyledFormHeading>

          <StyledFormInputWrapper>
            <StyledFormCheckBox>
              <input
                type="checkbox"
                onClick={() => setIsEmailChecked(!isEmailChecked)}
              />
              <label>Email</label>
            </StyledFormCheckBox>
            <StyledFormInput
              disabled={!isEmailChecked}
              type="email"
              {...register('email', {
                pattern: {
                  value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                  message: 'Please enter a valid email',
                },
              })}
            />
            <StyledFormError>
              {errors.email && errors.email.message}
            </StyledFormError>
          </StyledFormInputWrapper>

          <StyledFormInputWrapper>
            <StyledFormCheckBox>
              <input
                type="checkbox"
                onClick={() => setIsPhoneChecked(!isPhoneChecked)}
              />
              <label>Phone Number</label>
            </StyledFormCheckBox>
            <StyledFormInput
              disabled={!isPhoneChecked}
              type="tel"
              {...register('phoneNumber', {
                pattern: {
                  value: /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
                  message: 'Please enter a valid phone number',
                },
              })}
            />
            <StyledFormError>
              {errors.phoneNumber && errors.phoneNumber.message}
            </StyledFormError>
          </StyledFormInputWrapper>
        </StyledFormFieldContainer>

        <StyledFormDropDown>
          <label>Supervisor</label>
          <select
            {...register('supervisor', {
              required: { value: true, message: 'Select a supervisor' },
            })}
          >
            <option value="" hidden>
              Select...
            </option>
            {supervisors.map((supervisor) => (
              <option value={supervisor}>{supervisor}</option>
            ))}
          </select>
          <StyledFormError>
            {errors.supervisor && errors.supervisor.message}
          </StyledFormError>
        </StyledFormDropDown>

        <StyledSubmitWrapper>
          <input type="submit" />
          {isSuccess ? (
            <StyledFormSuccess>Successful submission!</StyledFormSuccess>
          ) : (
            <></>
          )}
        </StyledSubmitWrapper>
      </StyledForm>
    </>
  );
};

const StyledForm = styled.form`
  margin: auto;
  max-width: 800px;
`;

const StyledFormFieldContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const StyledFormHeading = styled.h2`
  grid-column-start: span 2;
  display: flex;
  padding: 0 2rem;
  font-size: 1rem;
`;

const StyledFormInput = styled.input`
  padding: 0.5rem 0.5rem;
`;

const StyledFormInputWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 2rem;

  label {
    text-align: left;
    margin-bottom: 0.5rem;
  }
`;

const StyledFormCheckBox = styled.div`
  display: flex;
`;

const StyledFormError = styled.span`
  color: red;
  position: absolute;
  bottom: 0;
`;

const StyledFormDropDown = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 2rem;
  max-width: 300px;
  margin: 1rem auto;

  select {
    padding: 0.5rem 0.5rem;
  }

  label {
    text-align: left;
    margin-bottom: 0.5rem;
  }
`;

const StyledSubmitWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 2rem;
`;

const StyledFormSuccess = styled.span`
  color: green;
  position: absolute;
  bottom: 0;
`;

export default NotificationForm;
