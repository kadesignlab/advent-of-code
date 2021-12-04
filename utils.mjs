import fetch from 'node-fetch';

export const fetchData = async (year, day) => {
  const url = `https://adventofcode.com/${year}/day/${day}/input`;

  let input = await fetch(url, {
    headers: { cookie: process.env.COOKIE }
  });

  return (await input.text()).trim();
};
