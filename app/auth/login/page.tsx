'use client';

import { ArrowRightIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

import AuthForm from '@/components/auth-form';

const ProfilePage = () => {
  return (
    <main>
      <Link href="/">
        <ArrowRightIcon className="mb-2 rotate-180" />
        <span className="sr-only">Return</span>
      </Link>
      <div className="row">
        <div className="col-6">
          <h1 className="header">Supabase Auth + Storage</h1>
          <p className="">
            Experience our Auth and Storage through a simple profile management
            example. Create a user profile and upload an avatar image. Fast,
            simple, secure.
          </p>
        </div>
        <div className="col-6 auth-widget">
          <AuthForm />
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;
