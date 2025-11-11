'use client';

import { useRouter } from 'next/navigation';
import { register } from '@/lib/api/clientsApi/clientApi';
import { logErrorResponse } from '@/app/api/_utils/utils';
import { useUserAuthStore } from '@/lib/api/store/authStore';
import RegistrationForm from '@/components/RegistrationForm/RegistrationForm';
import toast, { Toaster } from 'react-hot-toast';
import { FormikHelpers } from 'formik';
import { AxiosError } from 'axios';

export default function RegisterPage() {
  const router = useRouter();
  const setUser = useUserAuthStore((state) => state.setUser);

  const handleSubmit = async (
    values: { name: string; email: string; password: string },
    formikHelpers: FormikHelpers<{ name: string; email: string; password: string }>
  ) => {
    try {
      const user = await register(values);
      setUser(user);
      toast.success('Реєстрація успішна! Перенаправляємо...');
      router.push('/');
    } catch (error: unknown) {
      logErrorResponse(error);

      if ((error as AxiosError)?.response) {
        const err = error as AxiosError<{ fields?: Record<string, string>; error?: string }>;

        if (err.response?.data?.fields) {
          formikHelpers.setErrors(err.response.data.fields);
        }

        const message = err.response?.data?.error || err.message || 'Сталася помилка';
        toast.error(message);
      } else {
        toast.error('Невідома помилка під час реєстрації');
      }
    }
  };

  return (
    <>
      <Toaster position="top-right" />
      <RegistrationForm onSubmit={handleSubmit} />
    </>
  );
}