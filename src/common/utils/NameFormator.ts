const NameFormator = (name: string) => {
  const nameFormator = name.charAt(0).toUpperCase() + name.substring(1).toLowerCase();

  return nameFormator;
};
export default NameFormator;
