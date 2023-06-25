# Contributing Guidelines

Thank you for considering contributing to the open-api-umea repository! We appreciate your interest in helping us improve our project. This document outlines the guidelines and expectations for contributing to our repository.

## Code of Conduct

We expect all contributors to adhere to our [Code of Conduct](https://github.com/kodverk/open-api-umea/blob/main/CODE_OF_CONDUCT.md) when participating in our project. Please read it carefully before making any contributions.

## Getting Started

To contribute to the open-api-umea repository, follow the steps outlined below.

## Prerequisites

### Set up locally

_Some of the commands in this section assumes that you have the [GitHub CLI](https://github.com/cli/cli#installation) installed, however you can always use the Web UI if you prefer it._

Fork the repository:

```bash
gh repo fork kodverk/open-api
```

Clone your forked repository locally:

```bash
gh repo clone <your-github-name>/open-api
```

This project uses [pnpm](https://pnpm.io) as its package manager. Install it if you haven't already:

```bash
npm install -g pnpm
```

Install dependancies:

```bash
pnpm install
```

### Code away

_Here is a collection of some useful scripts that can be found in the repo_

| Command         | Description                                             |
| --------------- | ------------------------------------------------------- |
| `pnpm dev:docs` | Starts the dev server for the docs with HMR             |
| `pnpm dev`      | Starts the open-api library in dev mode                 |
| `pnpm format`   | Formats the code                                        |
| `pnpm lint`     | Lints the code                                          |
| `pnpm lint:fix` | Lints the code and fixes any errors                     |
| `pnpm check`    | Checks your code for typeerrors, formatting and linting |

When making commits, make sure to follow the [conventional commit](https://www.conventionalcommits.org/en/v1.0.0/) guidelines, i.e. prepending the message with `feat:`, `fix:`, `chore:`, `docs:`, etc... You can use `git status` to double check which files have not yet been staged for commit:

```bash
git add <file> && git commit -m "feat/fix/chore/docs: commit message"
```

### Ok I'm done! Now I want to create a Pull Request

Check that your code follows the project's style guidelines by running:

```bash
pnpm check
```

Please also make a manual, functional test of your changes.

If your change should appear in the changelog, i.e. it changes some behavior of any of the npm packages in `/packages/*` run changeset:

```bash
pnpm changeset
```

and filling out the form with the appropriate information. Then, add the generated changeset to git:

```bash
git add .changeset/*.md && git commit -m "chore: add changeset"
```

When all that's done, it's time to file a pull request to upstream:

```bash
gh pr create --web
```

# License

By contributing to this project, you agree that your contributions will be licensed under the [LICENSE](https://github.com/kodverk/open-api-umea/blob/main/LICENSE) file of the repository.
