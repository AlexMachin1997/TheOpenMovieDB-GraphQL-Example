const formatDate = (date, pattern) => {
  let formattedDate = moment(date).format(pattern);

  if (isEmpty(date) === true) {
    formattedDate = "--/--/--";
    return formattedDate;
  }

  return formattedDate;
};
