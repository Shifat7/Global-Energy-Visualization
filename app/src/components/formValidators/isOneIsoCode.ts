function validate(value: string) {
  if (value.length === 3) {
    return undefined;
  } else {
    return 'Invalid ISO code. Only one ISO code is allowed.';
  }
}

export default validate;
