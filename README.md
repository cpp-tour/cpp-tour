# A Tour of C++

Welcome to the tour of C++.

[![Build Status](https://travis-ci.org/Leandros/cpp-tour.svg?branch=master)](https://travis-ci.org/Leandros/cpp-tour)


# [Click Here to Take the Tour](https://cpp-tour.com)

Just here to take the tour? Go to [https://cpp-tour.com](https://cpp-tour.com).


# Table of Contents

- [Getting Started](#getting-started)
- [Branch Policy](#branch-policy)
- [Mission Statement](#mission-statement)
- [Contributing](#contributing)
- [Changelog](#changelog)
- [License](#license)


# Getting Started

## Build instruction

### Development

`npm start` - runs developement server on `localhost:3333`.  It automatically
re-builds changes.

### Production

`npm run build:p` builds production version with all optimizations.  It is
stored in directory `public/`


# Branch Policy

The `master` branch is stable at all times, and will only be updated for new
releases or bugfixes. This branch will be deployed on cpp-tour.com.

The `dev` branch is the main development branch, **all pull-requests should be
submitted to `dev`.** It might be unstable at times.

The `gh-pages` branch is the deployed website, and will be automatically
updated by pushing to `master`. It should not be touched manually, all changes
pushed will be overriden on the next automatic deployment.

Any other branch is likely a working branch, and might contain incomplete
changes.  Do not attempt to deploy, or file any pull-request against them.


# Mission Statement

We strive to create a great way to easily get started with C++, no matter your
level of experience. You can read our full mission statement at [MISSION].


# Contributing / Feedback

All contributions are welcome! We want to make the C++ tour a community effort,
and would like to hear your feedback, regardless of your level of expertise.

Please read the [CONTRIBUTING] before submitting a pull-request.


# Contact Us

You can find the C++ Tour team on the [CppLang Slack (click here to join)](https://cpplang.now.sh/)
in the `#cpp-tour` channel. We'll be happy to answer all of your questions.


# Changelog

The changelog contains the changes between versions.

Read the [CHANGELOG on dev] for latest bleeding edge changes.

Read the [CHANGELOG on master] for latest stable changes.


# Contributors

The project is maintained by [Arvid Gerstmann](https://arvid.io).
It would, however, not be possible without the countless contributors.

**Thank you!**

For the full list of contributors please read the [CONTRIBUTORS].


# License

All code is license under MIT. Copyright (c) 2017 Arvid Gerstmann.

All the content of the tour (found under `/lessons`) is licensed under
[CC-BY-SA 4.0](http://creativecommons.org/licenses/by-sa/4.0/).


[CONTRIBUTING]:         https://github.com/Leandros/cpp-tour/blob/dev/CONTRIBUTING.md#
[CHANGELOG on master]:  https://github.com/Leandros/cpp-tour/blob/master/CHANGELOG.md#
[CHANGELOG on dev]:     https://github.com/Leandros/cpp-tour/blob/dev/CHANGELOG.md#
[MISSION]:              https://github.com/Leandros/cpp-tour/blob/master/MISSION.md#
[CONTRIBUTORS]:         https://github.com/Leandros/cpp-tour/blob/master/CONTRIBUTORS.md#

