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
    formState: { errors },
  } = useForm<NotificationFormFields>({ mode: 'onBlur' });
  const onSubmit: SubmitHandler<NotificationFormFields> = (data) =>
    createNotification(data);

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

          <StyledFormInputWrapper>
            <div>
              <input type="checkbox" />
              <label>Email</label>
            </div>
            <StyledFormInput
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
            <div>
              <input type="checkbox" />
              <label>Phone Number</label>
            </div>
            <StyledFormInput
              type="tel"
              {...register('phoneNumber', {
                pattern: {
                  value: /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/,
                  message: 'Please enter a valid phone number',
                },
              })}
            />
            <StyledFormError>
              {errors.phoneNumber && errors.phoneNumber.message}
            </StyledFormError>
          </StyledFormInputWrapper>

          <StyledFormInputWrapper>
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
          </StyledFormInputWrapper>
        </StyledFormFieldContainer>

        <input type="submit" />
      </StyledForm>
    </>
  );
};

const StyledForm = styled.form`
  margin: 5rem;
`;

const StyledFormFieldContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
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

  span {
    color: red;
    position: absolute;
    bottom: 0;
  }
`;

const StyledFormError = styled.span``;

export default NotificationForm;
