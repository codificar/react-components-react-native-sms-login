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

            cellPhoneNumber: '',
            arrayCodeNumbers: [],
            arrayTexts: [],
            showInputSecCode: false,
            isSendingCode: false,
            isFocusedCellPhoneNumber: false,
            emptyNumber: null,
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
            let responseRequest = ''

            if (this.props.routeSendNumber !== '') {
                axios.get(this.props.routeSendNumber, {
                    params: {
                        cellPhoneNumber: this.state.cellPhoneNumber
                    }
                }).then(response => {
                    this.setState({ isSendingCode: false, showInputSecCode: true })
                    responseRequest = response
                    this.props.returnRequest(responseRequest)
                }).catch(error => {
                    this.setState({ isSendingCode: false })
                    responseRequest = error
                    this.props.returnRequest(responseRequest)
                })
            } else {
                setTimeout(() => {
                    this.setState({ isSendingCode: false, showInputSecCode: true })
                    responseRequest = 'Success send number request!'
                    this.props.returnRequest(responseRequest)
                }, 3000)
            }

        } else {
            this.setState({ emptyNumber: true })
        }
    }


    validateCode() {
        this.setState({ isSendingCode: true })
        let stringSecurity = this.state.arrayTexts.join('')
        let responseRequest = ''

        if (this.props.routSendSecCode !== '') {
            axios.get(this.props.routSendSecCode, {
                params: {
                    securityCode: stringSecurity
                }
            }).then(response => {
                this.setState({ isSendingCode: false })
                responseRequest = response
                this.props.returnRequest(responseRequest)
            }).catch(error => {
                this.setState({ isSendingCode: false })
                responseRequest = error
                this.props.returnRequest(responseRequest)
            })
        } else {
            setTimeout(() => {
                this.setState({ isSendingCode: false, showInputSecCode: true })
                responseRequest = 'Success validation request!'
                this.props.returnRequest(responseRequest)
            }, 3000)
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
                                    onPress={() => this.cellphoneValidation()}>
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
                                        onPress={() => this.validateCode()}>
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