export default class Cookie {
  public readonly name: string;

  constructor(name: string) {
    this.name = name;
  }

  public read(): string | null {
    const ret = new RegExp('(?:^|; )' + encodeURIComponent(this.name) + '=([^;]*)').exec((document as any).cookie);
    return ret ? ret[1] : null;
  }

  public write(value: string, days?: number): void {
    if (!days) {
      days = 365 * 30;
    }

    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));

    const expires = `; expires=${date.toUTCString()}`;
    (document as any).cookie = `${this.name}=${value}${expires}; path=/`;
  }
}
