export const formateDate = (date, config) => {
    //za month moze i 'short'
  const defaultOptions = { day: "numeric", month: "long", year: "numeric" };
  const options = config ? config : defaultOptions

  return new Date(date).toLocaleDateString('en-US', options)
};
