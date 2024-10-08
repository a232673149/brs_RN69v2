const Utils = {
  shallowEqual(objA: mixed, objB: mixed): boolean {
    if (objA === objB) {
      return true;
    }

    if (
      typeof objA !== 'object' ||
      objA === null ||
      typeof objB !== 'object' ||
      objB === null
    ) {
      return false;
    }

    const keysA = Object.keys(objA);
    const keysB = Object.keys(objB);

    if (keysA.length !== keysB.length) {
      return false;
    }

    
    const bHasOwnProperty = hasOwnProperty.bind(objB);
    for (let i = 0; i < keysA.length; i++) {
      if (!bHasOwnProperty(keysA[i]) || objA[keysA[i]] !== objB[keysA[i]]) {
        return false;
      }
    }
    return true;
  },

  shallowCompare(instance, nextProps, nextState) {
    return (
      !Utils.shallowEqual(instance.props, nextProps) ||
      !Utils.shallowEqual(instance.state, nextState)
    );
  },
};

export default Utils;
