export const createUser = (registeredUser) => {
    const {
      _id,firstName, lastName, phoneNumber, verified, profilePicture, username, dateOfBirth
    } = registeredUser;
    return {
      _id, firstName, lastName, phoneNumber, verified, profilePicture, username, dateOfBirth
    };
  };
  
  export default createUser;
  