export const formatDate = (date) => {
  const elements = date.split("-");
  return elements.reverse().join("/");
};
