const initState = {
  rooms: [
    {id: '1', title: 'Executive Suite', description: 'expensive stuff'},
    {id: '2', title: 'Economy Suite', description: 'affordable stuff'},
    {id: '3', title: 'Family Suite', description: 'togetherness stuff'}
  ]
};

const roomReducer = (state = initState, action) => {
  switch (action.type) {
    case 'CREATE_ROOM':
      console.log("created room", action.room);
      return state;
    case 'CREATE_ROOM_ERROR':
      console.log('create room error', action.err);
      return state;
    default:
      return state;
  }
};
export default roomReducer;
