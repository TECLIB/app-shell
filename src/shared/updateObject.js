const updateObject = (oldObject, updatedProperties, callback) => {
  if (callback) callback()
  return {
    ...oldObject,
    ...updatedProperties,
  }
}

export default updateObject
