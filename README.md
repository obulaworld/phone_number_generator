# phone_number_generator
An application that generates phone numbers for a telecommunication company.

## Project Structure

The project structure follows the **MVC** (Model-View-Controller) pattern.
```
├── src
│   ├── __tests__
│   │   └── phoneNumerGenerator.test.js
│   ├── controllers
│   │   └── PhoneNumberController
│   │   │      └── index.js
│   │   │      └── PhoneNumberController.js
│   │   └── index.js
│   ├── helpers
│   │   └── Error.js
│   │   └── defaults.js
│   │   └── generator.js
│   ├── index.js
│   ├── middlewares
│   │   └── checkQuery.js
```

## Requirements

* Node.js
* npm

## Getting Started

```
$ git clone https://github.com/obulaworld/phone_number_generator.git
$ cd phone_number_generator
$ npm install
$ npm run server                  # For development purpose
```

You should now be able to access the API via http://localhost:port/api/v1/

**NOTE:** Create a `.env` file configuration following the `.env.sample`.

## Project Details
`numbers:`
 - generate phone numbers
 - get generated phone numbers
 - get minimum and maximum generated phone numbers

## API Endpoints

<table>
<tr><th>HTTP VERB</th><th>ENDPOINTS</th><th>DESCRIPTION</th><th>QUERY</th></tr>
<tr><td>GET</td><td>/api/v1/numbers</td><td>Get generated phone numbers</td><td>quantity,order</td></tr>
<tr><td>GET</td><td>/api/v1/numbers/generate</td><td>Generate phone numbers/td><td>quantity,order</td></tr>
<tr><td>PUT</td><td>/api/v1/numbers/minmax</td><td>Get minimum and maximum generated phone numbers</td><td></td></tr>

