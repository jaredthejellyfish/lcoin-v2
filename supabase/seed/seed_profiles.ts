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

interface UserAccount {
  email: string;
  id: string;
}

interface UserProfile {
  email: string;
  name: string;
  username: string;
  balance: number;
}

// Read the JSON file
const jsonString = fs.readFileSync('user_accounts.json', 'utf8');

// Parse the JSON string into an array of UserAccount objects
const accounts: { data: UserAccount[] } = JSON.parse(jsonString);

// Now 'accounts' is an array containing user account data
const userAccounts: UserProfile[] = [];

fs.createReadStream('user_profiles.csv')
  .pipe(csv())
  .on('data', (row) => {
    const userAccount: UserProfile = {
      username: row.username,
      email: row.email,
      name: row.name,
      balance: row.balance,
    };
    userAccounts.push(userAccount);
  })
  .on('end', () => {
    // find the record in the accounts array that matches the email in the userAccounts array
    userAccounts.forEach(async (userAccount) => {
      const account = accounts.data.find(
        (account) => account.email === userAccount.email,
      );
      if (account) {
        const { error } = await supabase
          .from('profiles')
          .update({
            updated_at: new Date().toISOString(),
            username: userAccount.username,
            full_name: userAccount.name,
            balance: userAccount.balance,
          })
          .match({ id: account.id });

        if (error) {
          console.error(error);
        } else {
          console.log(`Updated profile ${userAccount.username}`);
        }
      }
    });
  });
