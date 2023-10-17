import React from 'react';

import BackButton from '@/components/back-button';
import { Button } from '@/components/ui/button';
import { signup } from '@/lib/actions';

const ProfilePage = () => {
  return (
    <main className="px-3">
      <BackButton backPath="/" title="Log In" />

      <div className="col-6 auth-widget row px-1 mt-5">
        <form className="mb-3" action={signup}>
          <div className="dark:bg-neutral-600/20 dark:border-transparent border border-neutral-300 mb-3 flex pb-3 flex-col px-3 py-2.5 rounded-xl">
            <label className="text-[0.8em] font-regular text-neutral-500 mb-0.5">
              Email
            </label>
            <input
              className="bg-transparent outline-none"
              type="text"
              name="email"
              minLength={1}
              maxLength={100}
              placeholder="Enter your email address"
            />
          </div>

          <div className="dark:bg-neutral-600/20 dark:border-transparent border border-neutral-300 mb-3 flex pb-3 flex-col px-3 py-2.5 rounded-xl">
            <label className="text-[0.8em] font-regular text-neutral-500 mb-0.5">
              Password
            </label>
            <input
              className="bg-transparent outline-none"
              type="password"
              name="password"
              minLength={1}
              maxLength={100}
              placeholder="Enter your password"
            />
          </div>

          <Button
            type="submit"
            className="btn btn-primary mt-2 ml-1"
            value="Sign in"
          >
            Sign In
          </Button>
        </form>
      </div>
    </main>
  );
};

export default ProfilePage;
