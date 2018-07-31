import WinJS from 'winjs'

export default function (dataSource) {
  const groupKey = function (data) {
    return (data[Object.keys(data)[0]])[0].toUpperCase()
  }

  const groupData = function (data) {
    return { title: groupKey(data) }
  }

  const groupSorted = function (a, b) {
    if (dataSource.order === 'ASC') {
      if (a < b) {
        return -1
      }
      if (a > b) {
        return 1
      }
      return 0
    }
    if (a > b) {
      return -1
    }
    if (a < b) {
      return 1
    }
    return 0
  }

  const sorter = (a, b) => {
    if (a[Object.keys(a)[0]] < b[Object.keys(b)[0]]) {
      return -1
    }
    if (a[Object.keys(a)[0]] > b[Object.keys(b)[0]]) {
      return 1
    }
    return 0
  }

  if (dataSource.data) {
    return new WinJS.Binding.List(dataSource.data)
      .createSorted(sorter)
      .createGrouped(groupKey, groupData, groupSorted)
  }
  return new WinJS.Binding.List([])
}
