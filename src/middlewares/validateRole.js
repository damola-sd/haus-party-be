const validateRoleValues = ({ decoded: { role } }, res, next) => {
    const validValues = ['customer', 'admin'];
    const valueIsValid = validValues.includes(role.toLowerCase());
    if (valueIsValid) {
      return next();
    }
    return res.status(406).json({
      message: 'specified role is invalid',
    });
  };
  
  export default validateRoleValues;
  