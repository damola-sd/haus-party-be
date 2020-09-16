const locationQuery = (long, latt, max = 5000) => ({
    location: {
      $near: {
        $maxDistance: max,
        $geometry: {
          type: 'Point',
          coordinates: [long, latt],
        },
      },
    },
  });
  
  export default locationQuery;
  