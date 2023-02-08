# Demex Website

This repository contains code for the [Demex Homepage UI](https://dem.exchange/).
## Environments
|Environment   |Github branch   |URL   |
|---|---|---|
|Production   |[master](https://github.com/Switcheo/demex-website)   |https://dem.exchange/   |
|Staging   |[staging](https://github.com/Switcheo/demex-website/tree/staging)   |https://staging.dem.exchange/   |

## Requirements
- Node.js v18 and above (you can change the version using [NVM](https://tecadmin.net/install-nvm-macos-with-homebrew/) or [Homebrew](https://www.denisbouquet.com/change-node-version-using-homebrew/))

## Setting up localhost
1. On the command line, run `cd /path/to/demex-website` to go to the root folder of the project.
2. Run `yarn install --ignore-engines` to install dependencies.
3. Run `yarn start`

## Linking local `carbon-js-sdk`
1. On the command line, run `cd /path/to/carbon-js-sdk` to go to the root directory of the `carbon-js-sdk` project.
2. Then run the following:
```#bash
# install ts-node, typescript
yarn global add ts-node typescript

# install local dependencies
yarn --ignore-engines

# build the SDK lib folder
yarn build

# link local carbon-js-sdk
yarn link
```
3. Return to the root directory of Demex Homepage project by running `cd /path/to/demex-website`.
4. Run `yarn link carbon-js-sdk` to link local SDK to this project.

## Deploying project on staging/production website
Follow the instructions in this [document](https://www.notion.so/switcheo/Create-Release-ee70ba6e76fe48ac8f2e98dffdfc6c77).
