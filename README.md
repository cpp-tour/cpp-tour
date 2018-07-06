[![C++ Tour Logo](docs/images/logo.png)](https://cpp-tour.com)

[![Build Status](https://travis-ci.com/cpp-tour/cpp-tour.svg?branch=dev)](https://travis-ci.com/cpp-tour/cpp-tour)


# [Click Here to Take the Tour](https://cpp-tour.com)


# Table of Contents

- [Getting Started](#getting-started)
- [Mission Statement](#mission-statement)
- [Contributing](#contributing)
- [Contact Us](#contact-us)
- [Contributors](#contributors)
- [License](#license)


# Getting Started

## Build instruction

### Dependencies

All dependencies are handled through yarn. Run `yarn install` to install them.

### Development

`yarn serve` - runs developement server on `127.0.0.1:8080`.
It watches your files and automatically rebuilds if anything changes.

### Production

`yarn build` builds production version with all optimizations.
The resulting build will be in the `dist/` directory, ready to be deployed.

## Adding Lessons

Lessons live in the `lessons/` folder. To add a new lesson create a new folder,
following the format of `X.X-name-here`. The name will be used as the identifier,
and the url slug to permalink to a lesson.
The resulting folder should contain two files:

- `code.cpp`, containing the code of the lesson.
- `text.md`, containing the text of the lesson. Advanced markdown & html available.

To make the lesson available in the application, add it to the `lessons/lessons.ts` file.
If the development server is running, all changes will be reflected immediately.


# Mission Statement

We strive to create a great way to easily get started with C++, no matter your
level of experience. You can read our full mission statement at [MISSION].


# Contributing

All contributions are welcome! We want to make the C++ tour a community effort,
and would like to hear your feedback, regardless of your level of expertise.

Please read the [CONTRIBUTING] before submitting a pull-request.


# Contact Us

You can find the C++ Tour team on the CppLang Slack [(click here to join)](https://cpplang.now.sh/)
in the `#cpp-tour` channel. We'll be happy to answer all of your questions.


# Contributors

The project is maintained by [Arvid Gerstmann](https://arvid.io).
It would, however, not be possible without the countless contributors. Thank you!

For the full list of contributors please read the [CONTRIBUTORS].


# License

All code is license under MIT, including the code in the lessons (under `/lessons/**/*.cpp`).

All the **text** content of the tour (found under `/lessons/**/*.md`) is licensed under
[CC-BY-NC-SA 4.0](http://creativecommons.org/licenses/by-nc-sa/4.0/).


[CONTRIBUTING]:         https://github.com/Leandros/cpp-tour/blob/dev/CONTRIBUTING.md#
[CHANGELOG on master]:  https://github.com/Leandros/cpp-tour/blob/master/CHANGELOG.md#
[CHANGELOG on dev]:     https://github.com/Leandros/cpp-tour/blob/dev/CHANGELOG.md#
[MISSION]:              https://github.com/Leandros/cpp-tour/blob/master/MISSION.md#
[CONTRIBUTORS]:         https://github.com/Leandros/cpp-tour/blob/master/CONTRIBUTORS.md#

