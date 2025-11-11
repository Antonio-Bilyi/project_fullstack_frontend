'use client';

import { useRouter } from 'next/navigation';
import { login } from '@/lib/api/clientsApi/clientApi';
import { logErrorResponse } from '@/app/api/_utils/utils';
import { useUserAuthStore } from '@/lib/store/authStore';
import LoginForm from '@/components/LoginForm/LoginForm';
import toast, { Toaster } from 'react-hot-toast';
import { FormikHelpers } from 'formik';
import { AxiosError } from 'axios';

export default function LoginPage() {
  const router = useRouter();
  const setUser = useUserAuthStore((state) => state.setUser);

  const handleSubmit = async (
    values: { email: string; password: string },
    formikHelpers: FormikHelpers<{ email: string; password: string }>
  ) => {
    try {
      const user = await login(values);
      setUser(user);
      toast.success('Вхід успішний! Перенаправляємо...');
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
        toast.error('Невідома помилка під час входу');
      }
    }
  };

  return (
    <>
      <Toaster position="top-right" />
      <LoginForm onSubmit={handleSubmit} />
    </>
  );
}
