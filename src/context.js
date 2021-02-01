import React from 'react'

export default React.createContext({
    locations: [],
    setLocations : () => {},
    user_name: '',
    setUserName: () => {},
    savedSpots : [],
    addToSaved : () => {},
    setUserSpots : () => {},
    deleteSpot : () => {},
    currentZip: '',
    setCurrentZip: () => {}

})