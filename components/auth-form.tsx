'use client'

import React from 'react'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import type { Database } from '@/lib/database'

export default function AuthForm() {
    const supabase = createClientComponentClient<Database>()

    return (
        <Auth
            supabaseClient={supabase}
            view="magic_link"
            appearance={{ theme: ThemeSupa }}
            theme="dark"
            showLinks={false}
            providers={["google", "github", ]}
            redirectTo='https://lcoin-iota.vercel.app/auth/callback'
        />
    )
}