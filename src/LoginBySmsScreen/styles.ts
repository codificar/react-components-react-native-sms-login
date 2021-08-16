import styled from "styled-components/native"
import { StyleSheet } from "react-native";
import { TextInputMask, TextInputMaskProps } from 'react-native-masked-text'

export const Container = styled.View`
flex: 1;
backgroundColor: #fbfbfb;`

export const NextText = styled.Text`    
    fontFamily: Roboto;
    color: #ffffff;
    fontSize: 16;`



export const TextDesc = styled.Text`
    fontFamily: Roboto;
    fontSize: 12;
    color: #ff5555;
    marginTop: 5;
    fontWeight: bold;
`;

export const ContValidation = styled.View`
    alignItems: enter;
    marginTop: 20;`;
    

export const TextCodeSentTitle = styled.Text`fontFamily: Roboto;`;

export const ButtonStyled = styled.TouchableOpacity`
        backgroundColor: #3f5105;
        width: 90%;
        height: 52;
        borderRadius: 4;
        justifyContent: center;
        alignItems: center;
        alignSelf: center;
        marginBottom: 10;
        bottom: 15;
        marginTop: 100;`;

export const InputValidationCode = styled.TextInput`
    borderBottomWidth: 1;
    borderBottomColor: #c6cbd4;
    textAlign: center;
    fontSize: 22;
    marginLeft: 10;`;

    // lib component, not part of the default react library, cant be a styled component.
    
    export const OldStyles =StyleSheet.create({
        TextInputMasked: {
        width: '115%',
        alignSelf: 'center',
        borderBottomWidth: 1,
        marginTop:25,
        textAlign: 'center',
        fontWeight: 'bold' ,
        fontSize: 14,
    }})