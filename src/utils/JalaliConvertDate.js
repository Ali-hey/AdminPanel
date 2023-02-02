import jMoment from "jalali-moment";

export const JalaliConvertDate = (date) => {
  return jMoment(date).format("jYYYY/jMM/jDD");
};
