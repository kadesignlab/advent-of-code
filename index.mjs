import { exec } from 'child_process';

exec(`node ./${process.argv[2]}/day-${process.argv[3]}.mjs`, ((err, stdout, stderr) => {
  console.log('stdout:\n' + stdout);
  console.log('stderr:\n' + stderr);
  if (err) console.error(err);
}));
