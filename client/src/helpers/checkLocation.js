export const checkLocationExists = (locations, inputtedLocation) => {
    if (locations.filter(i => i.name == inputtedLocation)) {
      return true;
    }
    
    return false;
  }
  