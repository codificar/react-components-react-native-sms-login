# react-native-sms-login

Componente para login pelo número de celular e validação por sms

## Install

add in package.json:

```bash
"react-native-sms-login": "git+https://libs:ofImhksJ@git.codificar.com.br/react-components/react-native-sms-login.git#feature.20733tsx",
```

execute the command:

```bash
$ yarn
or
$ npm install
```

## Usage

```javascript
import React from 'react';
import LoginBySmsScreen from 'react-native-sms-login/index';

returnRequest = (value) => {
  console.log('response request: ', value);
};

<SmsLogin
  app_type="user"
  deviceToken="token"
  deviceType="android"
  placeholderText="Digite o número do celular"
  buttonConfirmText="Confirmar"
  buttonColor="orange"
  textDescription="Digite seu número"
  buttonSendText="Enviar"
  condeSentTitle="Digite o código que foi enviado para seu número"
  secCodeLenght={5}
  routeSendNumber="https://rotadaapi:porta/api/enviar_codigo"
  routeSendSecCode="https://rotadaapi:porta/api/verificar_codigo"
  showMaskPhone={true}
  returnRequest={this.returnValue.bind(this.responseRequest)}
/>;
```

## Properties

| Prop              |  Default  |        Type         | isRequired | Description                                                                           |
| :---------------- | :-------: | :-----------------: | :--------: | ------------------------------------------------------------------------------------- |
| deviceType        |    ''     |      `string`       |     ✔️     | Prop for defining the type of the used device, not needed in this iteration.          |
| deviceToken       |    ''     |      `string`       |     ✔️     | Prop for defining the token of the used device, not needed in this iteration.         |
| app_type          |    ''     |      `string`       |     ✔️     | Prop for defining if the type of app is Provider or User.                             |
| placeholderText   |    ''     |      `string`       |     ✔️     | Placeholder Text for the number input.                                                |
| buttonConfirmText |    ''     |      `string`       |     ✔️     | The validation text ButtonStyled component.                                           |
| buttonColor       | '#6EB986' |      `string`       |     ✔️     | The button color of the ButtonStyled component.                                       |
| textDescription   |    ''     |      `string`       |     ✔️     | The error label when the cellphone number input is empty.                             |
| buttonSendText    |    ''     |      `string`       |     ✔️     | Text for describing the button to send the requests.                                  |
| condeSentTitle    |    ''     |      `string`       |     ✔️     | Text for informing when the code is sent.                                             |
| secCodeLenght     |    ''     |      `number`       |     ✔️     | The length in numbers of the validation code, prop based on param. set in the backend |
| routeSendNumber   |    ''     |      `string`       |     ✔️     | Route for API requisition of a security code to a number.                             |
| routeSendSecCode  |    ''     |      `string`       |     ✔️     | Route for API validation request of the security code.                                |
| showMaskPhone     |  'false'  |      `boolean`      |     ✔️     | Title description.                                                                    |
| returnRequest     |    ''     | `callback function` |     ✔️     | A bound callbackfunction who returns the api responses into the component.            |
