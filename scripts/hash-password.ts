import { hashPassword } from '../src/lib/auth/password';

async function main() {
  const password = process.argv[2];

  if (!password) {
    console.error('\nUsage: npx tsx scripts/hash-password.ts <password>\n');
    process.exit(1);
  }

  if (password.length < 8) {
    console.error('\n❌ Password must be at least 8 characters\n');
    process.exit(1);
  }

  const hash = await hashPassword(password);
  console.log('\n✅ Password hash generated!');
  console.log('\nAdd this to your .env.local file:\n');
  console.log(`ADMIN_PASSWORD_HASH=${hash}\n`);
}

main();
