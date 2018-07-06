const API_URL = 'https://wandbox.org/api';
const COMPILE_URL = `${API_URL}/compile.json`;
const DEFAULT_OPTIONS = ['-Wall', '-Wextra', '-std=c++17'];

export interface Result {
  status: string;
  compiler_output?: string;
  compiler_error?: string;
  compiler_message?: string;
  program_output?: string;
  program_error?: string;
  program_message?: string;
  url?: string;
}

export default class Compiler {

  /**
   * Send a request to compile code.
   *
   * Documentation of the wandbox API is found here:
   * https://github.com/melpon/wandbox/blob/master/kennel2/API.rst#post-compilejson
   */
  public compile(args: {
    code: string,
    codes: Array<{
      code: string;
      file: string;
    }>,
    compiler?: string,
    options?: string[],
    stdin?: string,
    save?: boolean,
  }): Promise<Result> {
    const body = {
      ...args,
    } as {[name: string]: any};
    delete body.options;

    if (!('compiler' in args)) {
      body.compiler = 'gcc-head';
    }

    let rawOptions = DEFAULT_OPTIONS;
    if ('options' in args) {
      rawOptions = rawOptions.concat(args.options as string[]);
    }

    body['compiler-option-raw'] = rawOptions.join('\n');
    const req = {
      method: 'POST',
      mode: 'cors' as any,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    };

    return fetch(COMPILE_URL, req).then((res: any) => res.json());
  }
}
