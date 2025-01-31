'use client';

import React, { memo } from 'react';
import LoginForm from '@/components/form/login-form';

function LoginPage() {
  return <LoginForm title="Login" />;
}

export default memo(LoginPage);
