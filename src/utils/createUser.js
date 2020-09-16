export const createUser = (registeredUser) => {
    const {
      firstName, lastName, phoneNumber, verified, profilePicture,
    } = registeredUser;
    return {
      firstName, lastName, phoneNumber, verified, profilePicture,
    };
  };
  
  export default createUser;
  