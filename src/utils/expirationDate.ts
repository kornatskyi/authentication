const hour = 3600000;
const min = 3600000 / 60;
const sec = 3600000 / 60 / 60;

export default (afterNHours: number) => {
  return new Date(Date.now() + afterNHours * hour);
};
