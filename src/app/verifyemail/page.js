// app/verifyemail/page.js
import { Suspense } from 'react';
import VerifyEmail from './VerifyEmail'; // If component is in same folder

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyEmail />
    </Suspense>
  );
}
