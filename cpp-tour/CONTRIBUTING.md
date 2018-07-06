# Contributing to the C++ Tour

The C++ Tour is a collaborative effort to provide an easy way of learning
the C++ language, through interactive lessons.

We encourage the following contributions:

- Creating new lessons
- Fixing bugs in existing lessons
- Proposing new lessons or changes to current lessons


# Pull Requests

We welcome contributions through pull requests for minor changes, like typos,
bug fixes in example code etc. Any large change should be first discussed in an
issue, and should be assigned to the pull request. This will increase the chances
that your pull request is accepted.


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


# Code Style

The project uses `clang-format` to produce a reproducible and consistent style
throughout all lessons. Please make sure to format all your code with the supplied
`.clang-format` before submitting any changes.


# Contributor License Agreement

By contributing to the C++ Tour (for example, through submitting a pull request)
you agree with the [individual contributor license agreement]. Make sure to read
and understand it.


[pull requests]:    https://help.github.com/articles/using-pull-requests/
[code of conduct]:  https://github.com/Leandros/cpp-tour/blob/master/CODE_OF_CONDUCT.md
[individual contributor license agreement]: https://github.com/Leandros/cpp-tour/blob/master/docs/CLA.md

