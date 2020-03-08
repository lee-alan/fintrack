class Util {
  formatToDollars(n) {
    // Money only has 2 decimals places
    n = n.toFixed(2);
    let sn = String(n);
    let final = ".".concat(sn[sn.length - 2].concat(sn[sn.length - 1]));
    for (var i = sn.length - 4; i >= 0; i--) {
      let d = sn.length - 4 - i;
      if (d !== 0 && d % 3 === 0) {
        final = ",".concat(final);
      }
      final = sn[i].concat(final);
    }
    return "$".concat(final);
  }
}

export let util = new Util();
