export const createUser = (registeredUser) => {
    const {
      _id,firstName, lastName, phoneNumber, profilePicture, username, dateOfBirth
    } = registeredUser;
    return {
      _id, firstName, lastName, phoneNumber, profilePicture, username, dateOfBirth
    };
  };
  
  export default createUser;
  