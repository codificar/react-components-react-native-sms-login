import React, { FC, useEffect } from 'react';
import { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import axios from 'axios';
import * as styles from './styles';
import * as types from '../../types';
import { useRoute, useNavigation } from '@react-navigation/core';

const LoginBySms: FC<{
  placeholderText: string;
  buttonConfirmText: string;
  buttonColor: string;
  textDescription: string;
  buttonSendText: string;
  condeSentTitle: string;
  secCodeLenght: number;
  routeSendNumber: string;
  routeSendSecCode: string;
  showMaskPhone: boolean;
  returnRequestSendSms: any;
  returnRequestValidateCode: any;
}> = (props) => {
  const navigation = useNavigation();
  //Props Received from the upper level
  // const [placeholderText, setPlaceholderText] = useState("")
  // const [buttonConfirmText, setButtonConfirmText] = useState('')
  // const [buttonColor, setButtonColor] = useState('')
  // const [secCodeLenght, setSecCodeLenght] = useState(0)
  // const [textDescription, setTextDescription] = useState('')
  // const [buttonSendtext, setButtonSendText] = useState('')
  // const [codeSentTitle, setCodeSentTitle] = useState('')
  // const [routeSendNumber, setRouteSendNumber] = useState(''),
  // const [routeSendSecCode, setRouteSendSecCode] = useState(''),
  // const [showMaskPhone, setShowMaskPhone] = useState(false),

  //State derived from the response of the sent number
  const [countryArea, setCountryArea] = useState('+55');
  const [providerId, setProviderId] = useState(null);
  const [userId, setUserId] = useState(null);

  //State derived from the inputs
  const [cellPhoneNumber, setCellPhoneNumber] = useState('');
  const [arrayCodeNumbers, setArrayCodeNumbers] = useState([]);
  const [arrayTexts, setArrayTexts] = useState([]);
  const [showInputSecCode, setShowInputSecCode] = useState(false);
  const [isSendingCode, setIsSendingCode] = useState(false);
  const [isFocusedCellPhoneNumber, setIsFocusedCellPhoneNumber] =
    useState(false);
  const [emptyNumber, setEmptyNumber] = useState(null);

  //State brought from the cellphone storage
  const [enviroment, setEnviroment] = useState('provider');
  const [deviceType, setDeviceType] = useState(null);
  const [deviceToken, setDeviceToken] = useState(null);

  useEffect(() => {
    let arrayAux = [];
    let arrayTextsAux = [];
    for (let i = 0; i < props.secCodeLenght; i++) {
      arrayAux.push(i);
      arrayTextsAux.push('');
    }

    arrayAux.forEach((item) => {
      this[`${item}_ref`] = React.createRef();
    });

    setArrayCodeNumbers(arrayAux);
    setArrayTexts(arrayTextsAux);
  });

  //This function provides the validation in the backend of the cellphone of the provider
  function cellphoneValidation() {
    if (cellPhoneNumber !== '') {
      setIsSendingCode(true);
      let responseRequestSendSms: types.PropsSmsLoginProviderResponse;
      let formattedNumberCell = cellPhoneNumber;
      formattedNumberCell = formattedNumberCell
        .replace('(', '')
        .replace(')', '')
        .replace('-', '')
        .replace(/ /g, '');
      formattedNumberCell = countryArea + formattedNumberCell;
      //console.log('formattedNumberCell: ', formattedNumberCell)
      if (props.routeSendNumber !== '') {
        axios
          .get(props.routeSendNumber, {
            params: {
              phone: formattedNumberCell,
            },
          })
          .then((response) => {
            setIsSendingCode(false);
            responseRequestSendSms = response.data;
            console.log('responseRequestSendSms: ', responseRequestSendSms);
            if (
              responseRequestSendSms.success == true &&
              responseRequestSendSms.login == true
            ) {
              setShowInputSecCode(true);
              //console.log('responseRequest.provider_id: ', responseRequestSendSms.provider_id)
              setProviderId(responseRequestSendSms.provider_id);
            }
            Object.assign(responseRequestSendSms, {
              cellPhoneNumber: formattedNumberCell,
            });
            props.returnRequestSendSms(responseRequestSendSms);
          })
          .catch((error) => {
            setIsSendingCode(false);
            responseRequestSendSms = error;
            props.returnRequestSendSms(responseRequestSendSms);
          });
      } else {
        setEmptyNumber(true);
      }
    }

    function cellphoneValidationForUser() {
      if (cellPhoneNumber !== '') {
        setIsSendingCode(true);
        let responseRequestSendSms: types.PropsSmsLoginUserResponse;
        let formattedNumberCell = cellPhoneNumber;
        formattedNumberCell = formattedNumberCell
          .replace('(', '')
          .replace(')', '')
          .replace('-', '')
          .replace(/ /g, '');
        formattedNumberCell = countryArea + formattedNumberCell;

        if (cellPhoneNumber !== '') {
          axios
            .post(props.routeSendNumber, {
              phone: formattedNumberCell,
            })
            .then((response) => {
              setIsSendingCode(false);
              responseRequestSendSms = response.data;
              if (
                responseRequestSendSms.success == true &&
                responseRequestSendSms.login == true
              ) {
                setShowInputSecCode(true);
                setProviderId(responseRequestSendSms.user_id);
              }
              Object.assign(responseRequestSendSms, {
                cellPhoneNumber: formattedNumberCell,
              });
              props.returnRequestSendSms(responseRequestSendSms);
            })
            .catch((error) => {
              setIsSendingCode(false);
              responseRequestSendSms = error;
              props.returnRequestSendSms(responseRequestSendSms);
            });
        }
      } else {
        setEmptyNumber(true);
      }
    }

    //this function provides the validation in the backend when the provider sends a code
    function validateCode() {
      setIsSendingCode(true);
      let stringSecurity = this.state.arrayTexts.join('');
      let responseRequestValidateCode: types.PropsSmsValidateCodeResponse;
      console.log(
        'Parametros para o login sms: ',
        this.state.providerId,
        stringSecurity,
      );
      if (props.routeSendSecCode !== '') {
        axios
          .get(props.routeSendSecCode, {
            params: {
              provider_id: providerId,
              code: stringSecurity,
            },
          })
          .then((response) => {
            setIsSendingCode(false);
            responseRequestValidateCode = response.data;
            Object.assign(responseRequestValidateCode, {
              securityCode: stringSecurity,
            });
            props.returnRequestValidateCode(responseRequestValidateCode);
          })
          .catch((error) => {
            setIsSendingCode(false);
            responseRequestValidateCode = error;
            props.returnRequestValidateCode(responseRequestValidateCode);
          });
      }
    }

    //this function provides the validation in the backend when the user sends a code
    function validateCodeForUser() {
      setIsSendingCode(true);
      let stringSecurity = arrayTexts.join('');
      let responseRequestValidateCode: types.PropsSmsValidateCodeResponse;

      if (props.routeSendSecCode !== '') {
        axios
          .post(props.routeSendSecCode, {
            user_id: providerId,
            code: stringSecurity,
            device_token: deviceToken,
            device_type: deviceType,
          })
          .then((response) => {
            setIsSendingCode(false);
            responseRequestValidateCode = response.data;
            Object.assign(responseRequestValidateCode, {
              securityCode: stringSecurity,
            });
            props.returnRequestValidateCode(responseRequestValidateCode);
          })
          .catch((error) => {
            setIsSendingCode(false);
            responseRequestValidateCode = error;
            props.returnRequestValidateCode(responseRequestValidateCode);
          });

        //this function handles the changing of the text input in the view
        function nextOrPrevInput(item: number, text: string) {
          let arrayTextAux = [];
          arrayTextAux = arrayTexts;
          arrayTextAux[item] = text;
          setArrayTexts(arrayTextAux);
          //this.setState({ arrayTexts: arrayTextAux }) weird bit of code

          if (text == '' && item > 0) {
            this[`${item - 1}_ref`].current.focus();
            arrayTextAux[item - 1] = '';
            setArrayTexts(arrayTextAux);
            //this.setState({ arrayTexts: arrayTextAux }) weirdness again
          } else if (text !== '' && item < props.secCodeLenght - 1) {
            this[`${item + 1}_ref`].current.focus();
          } else if (text == '' && item == 1) {
            this[`${item - 1}_ref`].current.focus();
          }
        }
        //this function handles the backspace key
        function backSpace(item, index) {
          if (index > 0) {
            let arrayTextAux = arrayTexts;
            arrayTextAux[index - 1] = '';
            setArrayTexts(arrayTextAux);
            //this.setState({ arrayTexts: arrayTextAux }) still strange
          }
          if (item > 0) {
            this[`${item - 1}_ref`].current.focus();
          }
        }

        return (
          <View /*style={styles.container}*/>
            {!showInputSecCode ? (
              <View /*style={{ alignItems: 'center' }}*/>
                <TextInputMask
                  type={props.showMaskPhone ? 'cel-phone' : 'only-numbers'}
                  placeholder={props.placeholderText}
                  style={[
                    styles.OldStyles.TextInputMasked,
                    {
                      borderBottomColor: isFocusedCellPhoneNumber
                        ? '#6EB986'
                        : '#6c757d',
                    },
                  ]}
                  value={cellPhoneNumber}
                  onFocus={() => setIsFocusedCellPhoneNumber(true)}
                  onBlur={() => setIsFocusedCellPhoneNumber(false)}
                  onChangeText={(text) => setCellPhoneNumber(text)}
                />
                {emptyNumber ? (
                  <styles.TextDesc>{props.textDescription}</styles.TextDesc>
                ) : null}

                {isSendingCode ? (
                  <View>
                    <styles.ButtonStyled>
                      <ActivityIndicator color="#ffffff" size="large" />
                    </styles.ButtonStyled>
                  </View>
                ) : (
                  <styles.ButtonStyled
                    onPress={() =>
                      enviroment == 'provider'
                        ? cellphoneValidation()
                        : cellphoneValidationForUser()
                    }>
                    <styles.NextText>{props.buttonSendText}</styles.NextText>
                  </styles.ButtonStyled>
                )}
              </View>
            ) : (
              <styles.ContValidation>
                <styles.TextCodeSentTitle>Code Sent</styles.TextCodeSentTitle>
                <View style={{ flexDirection: 'row' }}>
                  {arrayCodeNumbers.map((item, index) => (
                    <styles.InputValidationCode
                      maxLength={1}
                      keyboardType="numeric"
                      key={item}
                      value={arrayTexts[index]}
                      onChangeText={(text) => nextOrPrevInput(item, text)}
                      ref={this[`${item}_ref`]}
                      onKeyPress={({ nativeEvent }) => {
                        if (
                          nativeEvent.key === 'Backspace' &&
                          arrayTexts[index] == ''
                        ) {
                          backSpace(item, index);
                        }
                      }}></styles.InputValidationCode>
                  ))}
                </View>
                {isSendingCode ? (
                  <View>
                    <styles.ButtonStyled>
                      <ActivityIndicator color="#ffffff" size="large" />
                    </styles.ButtonStyled>
                  </View>
                ) : (
                  <styles.ButtonStyled
                    onPress={() =>
                      enviroment == 'provider'
                        ? validateCode()
                        : validateCodeForUser()
                    }>
                    <styles.NextText>{props.buttonConfirmText}</styles.NextText>
                  </styles.ButtonStyled>
                )}
              </styles.ContValidation>
            )}
          </View>
        );
      }
    }
  }
};
