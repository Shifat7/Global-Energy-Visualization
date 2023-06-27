function validate(value: string) {
  const valToNumber = parseInt(value.toString());
  const errors = [];

  if (!/^\d\d\d\d$/.test(value.toString())) {
    errors.push('Not a valid year');
  }

  if (valToNumber <= 1900 || valToNumber > new Date().getFullYear()) {
    errors.push(`Please enter a year between 1900 and ${new Date().getFullYear()}`);
  }

  if (errors.length > 0) {
    return errors.join('. \n');
  } else {
    return undefined;
  }
}

export default validate;
