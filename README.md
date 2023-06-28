# Open API.
This package serves API wrappers for various open APIs.

## Installation & Usage.
To install and use a API wrapper, follow these steps:

1. Install the package through your favorite package manager. For this example, we'll use npm.
```terminal
npm i @kodverket/umea-open-api
```
2. Then, import the wrapper in your codebase.
```javascript
import { UmeaOpenAPI } from '@kodverket/umea-open-api'
```
3. After that, we're ready to use the wrapper class. In this example, we'll call the API for public beaches in the muncipality of Umeå.
```javascript
const function myFunction() {
    const apiWrapper = new UmeaOpenAPI()
    const res = apiWrapper.getPublicBeaches()
}
```
Congratulations, it's simple as that. Further details (such as API options and other APIs) is found at[Kodverket](https://docs.kodverk.se).