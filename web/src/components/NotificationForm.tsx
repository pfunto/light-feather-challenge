import styled from 'styled-components';
import { useForm, SubmitHandler } from 'react-hook-form';
interface Inputs {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  // supervisor: string;
}

const NotificationForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ mode: 'onBlur' });
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

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
            {errors.lastName && errors.lastName.message}
          </div>

          <div>
            <div>
              <input type="checkbox"></input>
              <label>Email</label>
            </div>
            <input
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
              <input type="checkbox"></input>
              <label>Phone Number</label>
            </div>
            <input
              {...register('phoneNumber', {
                pattern: {
                  value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                  message: 'Please enter a valid phone number',
                },
              })}
            />
            {errors.email && errors.email.message}
          </div>

          {/* <div>
          <label>Supervisor</label>
          <input></input>
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
