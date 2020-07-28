# react-native-sms-login
Componente para login pelo número de celular e validação por sms

## Install
add in package.json:
```bash
"react-native-sms-login": "git+https://libs:ofImhksJ@git.codificar.com.br/react-components/react-native-sms-login.git",
```

execute the command:
```bash
$ yarn
or
$ npm install 
```

## Usage

```javascript
import React from 'react'
import SmsLogin from 'react-native-sms-login'


  returnValue = (value) => {
    console.log('response request: ', value)
  }

 
 <SmsLogin
  placeholderText='Digite o número do celular'
  buttonConfirmText='Confirmar'
  buttonColor='orange'
  textDescription='Digite seu número'
  buttonSendText='Enviar'
  codeSentTitle='Digite o código que foi enviado para seu número'
  secCodeLenght={5}
  routeSendNumber=''
  routSendSecCode=''
  showMaskPhone={true}
  returnRequest={this.returnValue.bind(this.responseRequest)}
  />


```



## Properties

| Prop  | Default  | Type | isRequired | Description
| :------------ |:---------------:| :---------------:|:---------------:|--
| placeholderText | '' | `string` |  | placeholderText input. |
| buttonConfirmText | '' | `string` |  | confirm validation text TouchableOpacity component. |
| buttonColor | '#6EB986' | `string` |  | the button color of TouchableOpacity component. |
| textDescription | '' | `string` |  | the error label when empty cellphone number input. |
| buttonSendText | '' | `string` |  | send cellphone number text of TouchableOpacity component. |
| codeSentTitle | '' | `string` |  | Title description. |
| secCodeLenght | '' | `number` | ✔️ | The number of inputs validation code based on backend param. |
| routeSendNumber | '' | `string` |  | route for API send cellphone number request. |
| routSendSecCode | '' | `string` |  | route for API validation request. |
| showMaskPhone | 'false' | `boolean` |  | Title description. |
| returnRequest | '' | `callback function` |  | A function who return the api response. |