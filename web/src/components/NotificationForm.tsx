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
          <div>
            <label>First Name</label>
            <input
              {...register('firstName', {
                required: { value: true, message: 'First name is required' },
                pattern: {
                  value: /^[A-Za-z]+$/i,
                  message: 'Please, only use letters',
                },
              })}
            />
            {errors.firstName && errors.firstName.message}
          </div>

          <div>
            <div>
              <label>Last Name</label>
              <input
                {...register('lastName', {
                  required: { value: true, message: 'Last name is required' },
                  pattern: {
                    value: /^[A-Za-z]+$/i,
                    message: 'Please, only use letters',
                  },
                })}
              />
            </div>

            {errors.lastName && errors.lastName.message}
          </div>

          <div>
            <div>
              <input type="checkbox" />
              <label>Email</label>
            </div>
            <input
              type="email"
              {...register('email', {
                pattern: {
                  value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                  message: 'Please enter a valid email',
                },
              })}
            />
            {errors.email && errors.email.message}
          </div>

          <div>
            <div>
              <input type="checkbox" />
              <label>Phone Number</label>
            </div>
            <input
              type="tel"
              {...register('phoneNumber', {
                pattern: {
                  value: /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/,
                  message: 'Please enter a valid phone number',
                },
              })}
            />
            {errors.phoneNumber && errors.phoneNumber.message}
          </div>

          {/* <div>
            <label>Supervisor</label>
            <select
              {...register('supervisor', {
                required: { value: true, message: 'Select a supervisor' },
              })}
            />
            {errors.supervisor && errors.supervisor.message}
          </div> */}
        </StyledFormFieldContainer>

        <input type="submit" />
      </StyledForm>
    </>
  );
};

const StyledForm = styled.form``;

const StyledFormFieldContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

export default NotificationForm;
