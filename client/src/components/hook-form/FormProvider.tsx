import { FormProvider as Form } from 'react-hook-form';

interface FormProviderInterface {
  children: JSX.Element[];
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  methods?: any;
}

function FormProvider({ children, onSubmit, methods }: FormProviderInterface) {
  return (
    <Form { ...methods }>
      <form onSubmit={ onSubmit }>
        { children }
      </form>
    </Form>
  )
}

export default FormProvider;