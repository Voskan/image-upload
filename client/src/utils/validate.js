import messages from "../messages";

const isRequired = (value) => {
  return value && value.trim() ? null : messages.required_field;
};

const minStrLength = (minLength) => (value) => {
  const val = String(value).trim();
  if (val && val.length >= minLength) {
    return null;
  }

  return `Минимум ${minLength} символов`;
};

const isNumber = (value) => {
  return isNaN(value) ? null : messages.is_not_number;
};

const isEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!re.test(email.toLowerCase())) {
    return messages.not_valid_email;
  }

  return null;
};

const isSite = (site) => {
  const re = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[\w0-9]+([-.]{1}[\w0-9]+)*\.[\w]{2,5}(:[0-9]{1,5})?(\/.*)?$/im;

  if (!re.test(site.toLowerCase())) {
    return messages.not_valid_site;
  }

  return null;
};

const isPhone = (phone) => {
  const re = /^(\(\d{2,4}\)|\d{2,4}|\+\d{2,4}|\(\+\d{2,4}\))\s\d{2,3}(\s|-)\d{2,3}(\s|-)\d{2,4}$/im;

  if (!re.test(phone.toLowerCase())) {
    return messages.not_valid_phone;
  }

  return null;
};

const checkPassword = (values) => {
  if (values.password !== values.rePassword) {
    return messages.not_equal_passwords;
  }

  return null;
};

export {
  isEmail,
  isPhone,
  isSite,
  isRequired,
  isNumber,
  minStrLength,
  checkPassword
};
