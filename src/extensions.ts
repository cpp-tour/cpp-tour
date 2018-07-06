interface Array<T> {
  remove(elem: T): boolean;
}

interface String {
  countOf(c: string): number;
}

if (!Array.prototype.remove) {
  Array.prototype.remove = function(this: any[], elem: any) {
    const arr = this as any[];
    const idx = arr.indexOf(elem);
    if (idx !== -1) {
      arr.splice(idx, 1);
      return true;
    }
    return false;
  };
}

if (!String.prototype.countOf) {
  String.prototype.countOf = function(this: string, c: string) {
    /* tslint:disable:no-empty */
    let ret = -1;
    for (
      let index = 0;
      index !== -1;
      ret++, index = this.indexOf(c, index + 1)
    ) {}
    return ret;
  };
}

const isIE = /Trident|MSIE/.test(navigator.userAgent);
if (isIE) {
  (Element as any).prototype.remove = function() {
    this.parentElement.removeChild(this);
  };

  (NodeList as any).prototype.remove = (HTMLCollection as any).prototype.remove = function() {
    for (let i = this.length - 1; i >= 0; i--) {
      if (this[i] && this[i].parentElement) {
        this[i].parentElement.removeChild(this[i]);
      }
    }
  };
}

