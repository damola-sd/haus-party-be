export const createUser = (registeredUser) => {
    const {
      firstName, lastName, phoneNumber, verified, profilePicture, username
    } = registeredUser;
    return {
      firstName, lastName, phoneNumber, verified, profilePicture, username
    };
  };
  
  export default createUser;
  