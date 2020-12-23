export const checkLocationExists = (locations, inputtedLocation) => {
    return locations.filter(i => i.id == inputtedLocation).length > 0;
}
  