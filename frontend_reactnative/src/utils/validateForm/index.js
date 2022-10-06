export const ValidateEmail = email => {
  var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (email.match(mailformat)) {
    return '';
  } else {
    return '* Invalid email';
  }
};

export const ValidateUsername = username => {
  var usernameformat = /^[a-zA-Z0-9]+$/;
  if (username.length < 6) {
    return '* Username must be at least 6 characters';
  } else if (!username.match(usernameformat)) {
    return '* Username must contain only letters and numbers';
  }
  return '';
};

export const ValidatePassword = password => {
  let listErrors = [];
  if (!password.match(/[a-z]/g)) {
    listErrors.push('1 lowercase letter');
  }
  if (!password.match(/[A-Z]/g)) {
    listErrors.push('1 uppercase letter');
  }
  if (!password.match(/[0-9]/g)) {
    listErrors.push('1 number');
  }
  if (!password.match(/[^a-zA-Z\d]/g)) {
    listErrors.push('1 special character');
  }
  if (password.length < 6) {
    listErrors.push('6 characters');
  }

  if (listErrors.length > 1) {
    let last = listErrors.pop();
    return `* Password must contain at least ${listErrors.join(
      ', ',
    )} and ${last}`;
  } else if (listErrors.length === 1) {
    return `* Password must contain at least ${listErrors[0]}`;
  }

  return '';
};

export const ValidateConfirmPassword = (password, confirmPassword) => {
  if (password !== confirmPassword) {
    return '* Password does not match';
  }
  return '';
};
