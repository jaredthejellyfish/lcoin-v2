import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';

import csv from 'csv-parser';

const supabase_url = 'https://uthoeaudrvjtdgjwmgun.supabase.co';

const service_role_key =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV0aG9lYXVkcnZqdGRnandtZ3VuIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5NzIwMzMwNiwiZXhwIjoyMDEyNzc5MzA2fQ.THMibrvd8YjxOoGJyWDO5uspcpYmQRDXC-p9M1y55Og';

const supabase = createClient(supabase_url, service_role_key, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

interface User {
  fullName: string;
  username: string;
  email: string;
  password: string;
}

interface UIA {
  id: string;
  email: string;
}

const users: User[] = [];
const userIDsWithEmail: UIA[] = [];

fs.createReadStream('users.csv')
  .pipe(csv())
  .on('data', (row) => {
    const user: User = {
      fullName: row.name,
      username: row.username,
      email: row.email,
      password: row.password,
    };
    users.push(user);
  })
  .on('end', async () => {
    for (const user of users) {
      const { data, error } = await supabase.auth.admin.createUser({
        email: user.email,
        password: user.password,
        email_confirm: true,
      });

      if (error) {
        console.error(error);
      } else {
        userIDsWithEmail.push({ id: data?.user.id, email: user.email });
        console.log(`Created account ${user.email}`);
      }
    }
    console.log(userIDsWithEmail);
  });
