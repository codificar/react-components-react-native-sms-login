import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, TextInput } from 'react-native'
import { TextInputMask } from 'react-native-masked-text'
import axios from 'axios'

class SmsLogin extends Component {
    constructor(props) {
        super(props)
        this.state = {
            placeholderText: this.props.placeholderText,
            buttonConfirmText: this.props.buttonConfirmText,
            buttonColor: this.props.buttonColor ? this.props.buttonColor : '#6EB986',
            secCodeLenght: this.props.secCodeLenght,
            textDescription: this.props.textDescription,
            buttonSendText: this.props.buttonSendText,
            codeSentTitle: this.props.codeSentTitle,
            routeSendNumber: this.props.routeSendNumber,
            routSendSecCode: this.props.routSendSecCode,
            showMaskPhone: this.props.showMaskPhone ? this.props.showMaskPhone : false,

            countryArea: this.props.countryArea ? this.props.countryArea : '+55',
            providerId: null,

            cellPhoneNumber: '',
            arrayCodeNumbers: [],
            arrayTexts: [],
            showInputSecCode: false,
            isSendingCode: false,
            isFocusedCellPhoneNumber: false,
            emptyNumber: null,

			environment: this.props.environment ? this.props.environment : 'provider',
			deviceType: this.props.deviceType ? this.props.deviceType : null,
			deviceToken: this.props.deviceToken ? this.props.deviceToken : null
        }
    }


    componentDidMount() {
        let arrayAux = []
        let arrayTextsAux = []
        for (let i = 0; i < this.state.secCodeLenght; i++) {
            arrayAux.push(i)
            arrayTextsAux.push('')
        }

        arrayAux.forEach(item => {
            this[`${item}_ref`] = React.createRef()
        })

        this.setState({ arrayCodeNumbers: arrayAux, arrayTexts: arrayTextsAux })
    }


    cellphoneValidation() {
        if (this.state.cellPhoneNumber !== '') {
            this.setState({ isSendingCode: true })
            let responseRequestSendSms = ''
            let formattedNumberCell = this.state.cellPhoneNumber
            formattedNumberCell = formattedNumberCell.replace("(", "").replace(")", "").replace("-", "").replace(/ /g, "")
            formattedNumberCell = this.state.countryArea + formattedNumberCell
            //console.log('formattedNumberCell: ', formattedNumberCell)
            if (this.props.routeSendNumber !== '') {
                axios.get(this.props.routeSendNumber, {
					params: {
                    	phone: formattedNumberCell
					}
                }).then(response => {
                    this.setState({ isSendingCode: false })
                    responseRequestSendSms = response.data
                    console.log('responseRequestSendSms: ', responseRequestSendSms)
                    if (responseRequestSendSms.success == true && responseRequestSendSms.login == true) {
                        this.setState({ showInputSecCode: true })
                        //console.log('responseRequest.provider_id: ', responseRequestSendSms.provider_id)
						this.setState({ providerId: responseRequestSendSms.provider_id })
                    }
                    Object.assign(responseRequestSendSms, { cellPhoneNumber: formattedNumberCell })
                    this.props.returnRequestSendSms(responseRequestSendSms)
                }).catch(error => {
                    this.setState({ isSendingCode: false })
                    responseRequestSendSms = error
                    this.props.returnRequestSendSms(responseRequestSendSms)
                })
            } /*else {
                setTimeout(() => {
                    this.setState({ isSendingCode: false, showInputSecCode: true })
                    responseRequestSendSms = 'Success send number request!'
                    this.props.returnRequestSendSms(responseRequestSendSms)
                }, 3000)
            }*/
        } else {
            this.setState({ emptyNumber: true })
        }
    }

	cellphoneValidationForUser() {
        if (this.state.cellPhoneNumber !== '') {
            this.setState({ isSendingCode: true })

            let responseRequestSendSms = ''
            let formattedNumberCell = this.state.cellPhoneNumber
            formattedNumberCell = formattedNumberCell.replace("(", "").replace(")", "").replace("-", "").replace(/ /g, "")
            formattedNumberCell = this.state.countryArea + formattedNumberCell

            if (this.props.routeSendNumber !== '') {
                axios.post(this.props.routeSendNumber, {
                    phone: formattedNumberCell
                }).then(response => {
                    this.setState({ isSendingCode: false })
                    responseRequestSendSms = response.data

                    if (responseRequestSendSms.success == true && responseRequestSendSms.login == true) {
                        this.setState({ showInputSecCode: true })
                        this.setState({ providerId: responseRequestSendSms.user_id })
                    }

                    Object.assign(responseRequestSendSms, { cellPhoneNumber: formattedNumberCell })
                    this.props.returnRequestSendSms(responseRequestSendSms)
                }).catch(error => {
                    this.setState({ isSendingCode: false })
                    responseRequestSendSms = error
                    this.props.returnRequestSendSms(responseRequestSendSms)
                })
            } 
        } else {
            this.setState({ emptyNumber: true })
        }
    }


    validateCode() {
        this.setState({ isSendingCode: true })
        let stringSecurity = this.state.arrayTexts.join('')
        let responseRequestValidateCode = ''
        console.log('Parametros para o login sms: ', this.state.providerId, stringSecurity)
        if (this.props.routSendSecCode !== '') {
            axios.get(this.props.routSendSecCode, {
				params: {
					provider_id: this.state.providerId,
					code: stringSecurity
				}
            }).then(response => {
                this.setState({ isSendingCode: false })
                responseRequestValidateCode = response
                Object.assign(responseRequestValidateCode, { securityCode: stringSecurity })
                this.props.returnRequestValidateCode(responseRequestValidateCode)
            }).catch(error => {
                this.setState({ isSendingCode: false })
                responseRequestValidateCode = error
                this.props.returnRequestValidateCode(responseRequestValidateCode)
            })
        } /*else {
            setTimeout(() => {
                this.setState({ isSendingCode: false, showInputSecCode: true })
                responseRequestValidateCode = 'Success validation request!'
                this.props.returnRequestValidateCode(responseRequestValidateCode)
            }, 3000)
        }*/
    }

	validateCodeForUser() {
        this.setState({ isSendingCode: true })

        let stringSecurity = this.state.arrayTexts.join('')
        let responseRequestValidateCode = ''

        if (this.props.routSendSecCode !== '') {
            axios.post(this.props.routSendSecCode, {
				user_id: this.state.providerId,
				code: stringSecurity,
				device_token: this.state.deviceToken,
				device_type: this.state.deviceType
            }).then(response => {
                this.setState({ isSendingCode: false })
                responseRequestValidateCode = response
                Object.assign(responseRequestValidateCode, { securityCode: stringSecurity })
                this.props.returnRequestValidateCode(responseRequestValidateCode)
            }).catch(error => {
                this.setState({ isSendingCode: false })
                responseRequestValidateCode = error
            })
        } 
    }


    nextOrPrevInput(item, text) {
        let arrayTextAux = []
        arrayTextAux = this.state.arrayTexts
        arrayTextAux[item] = text
        this.setState({ arrayTexts: arrayTextAux })

        if (text == '' && item > 0) {
            this[`${item - 1}_ref`].current.focus()
            arrayTextAux[item - 1] = ''
            this.setState({ arrayTexts: arrayTextAux })
        } else if (text !== '' && item < this.state.secCodeLenght - 1) {
            this[`${item + 1}_ref`].current.focus()
        } else if (text == '' && item == 1) {
            this[`${item - 1}_ref`].current.focus()
        }
    }


    backSpace(item, index) {
        if (index > 0) {
            let arrayTextAux = this.state.arrayTexts
            arrayTextAux[index - 1] = ''
            this.setState({ arrayTexts: arrayTextAux })
        }
        if (item > 0) {
            this[`${item - 1}_ref`].current.focus()
        }
    }


    render() {
        const buttonStyle = StyleSheet.create({
            button: {
                backgroundColor: this.state.buttonColor,
                width: '90%',
                height: 52,
                borderRadius: 4,
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',
                marginBottom: 10,
                bottom: 15,
                marginTop: 100
            },
        })
        return (
            <View /*style={styles.container}*/>
                {!this.state.showInputSecCode ? (
                    <View /*style={{ alignItems: 'center' }}*/>
                        <TextInputMask
                            type={this.state.showMaskPhone ? 'cel-phone' : 'only-numbers'}
                            placeholder={this.state.placeholderText}
                            style={[styles.input, { borderBottomColor: this.state.isFocusedCellPhoneNumber ? '#6EB986' : '#6c757d' }]}
                            value={this.state.cellPhoneNumber}
                            onFocus={() => this.setState(this.setState({ isFocusedCellPhoneNumber: true }))}
                            onBlur={() => this.setState({ isFocusedCellPhoneNumber: false })}
                            onChangeText={text => this.setState({ cellPhoneNumber: text })}
                        />
                        {this.state.emptyNumber ? (
                            <Text style={styles.txtDesc}>{this.state.textDescription}</Text>
                        ) : null}

                        {this.state.isSendingCode ? (
                            <View style={buttonStyle.button}>
                                <ActivityIndicator color='#ffffff' size="large" />
                            </View>
                        ) : (
                                <TouchableOpacity style={buttonStyle.button}
                                    onPress={() => this.state.environment == 'provider' ? this.cellphoneValidation() : this.cellphoneValidationForUser()}>
                                    <Text style={styles.nextText}>{this.state.buttonSendText}</Text>
                                </TouchableOpacity>
                            )}
                    </View>
                ) : (
                        <View style={styles.contValidation}>
                            <Text style={styles.txtCodeSentTitle}>{this.state.codeSentTitle}</Text>
                            <View style={{ flexDirection: 'row' }}>
                                {
                                    this.state.arrayCodeNumbers.map((item, index) =>
                                        (
                                            <TextInput style={styles.inputValidationCode}
                                                maxLength={1}
                                                keyboardType='numeric'
                                                key={item}
                                                value={this.state.arrayTexts[index]}
                                                onChangeText={(text) => this.nextOrPrevInput(item, text)}
                                                ref={this[`${item}_ref`]}
                                                onKeyPress={({ nativeEvent }) => {
                                                    if (nativeEvent.key === 'Backspace' && this.state.arrayTexts[index] == '') {
                                                        this.backSpace(item, index)
                                                    }
                                                }}
                                            />
                                        ))
                                }
                            </View>
                            {this.state.isSendingCode ? (
                                <View style={buttonStyle.button}>
                                    <ActivityIndicator color='#ffffff' size="large" />
                                </View>
                            ) : (
                                    <TouchableOpacity style={buttonStyle.button}
                                        onPress={() => this.state.environment == 'provider' ? this.validateCode() : this.validateCodeForUser()}>
                                        <Text style={styles.nextText}>{this.state.buttonConfirmText}</Text>
                                    </TouchableOpacity>
                                )}
                        </View>
                    )}
            </View>
        )
    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fbfbfb'
    },
    nextText: {
        fontFamily: 'Roboto',
        color: '#ffffff',
        fontSize: 16
    },
    input: {
        width: '60%',
        alignSelf: 'center',
        borderBottomWidth: 1,
        marginTop: 25,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16
    },
    txtDesc: {
        fontFamily: 'Roboto',
        fontSize: 12,
        color: '#FF5555',
        marginTop: 5,
        fontWeight: 'bold'
    },
    contValidation: {
        alignItems: 'center',
        marginTop: 20
    },
    txtCodeSentTitle: {
        fontFamily: 'Roboto'
    },
    inputValidationCode: {
        borderBottomWidth: 1,
        borderBottomColor: '#C6CBD4',
        textAlign: 'center',
        fontSize: 22,
        marginLeft: 10
    },
})

export default SmsLogin