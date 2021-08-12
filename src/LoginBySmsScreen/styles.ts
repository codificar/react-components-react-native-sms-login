import styled from "styled-components/native"

let buttonColor = '#3F51B5'

export const Container = styled.View`
flex: 1;
backgroundColor: #fbfbfb;`;

export const NextText = styled.Text`    
    fontFamily: 'Roboto',
    color: '#ffffff',
    fontSize: 16`;

export const TextInputMasked = styled.TextInput`
    width: '115%',
    alignSelf: 'center',
    borderBottomWidth: 1,
    marginTop: 25,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14`;

export const TextDesc = styled.Text`
    fontFamily: 'Roboto',
    fontSize: 12,
    color: '#FF5555',
    marginTop: 5,
    fontWeight: 'bold'
`;

export const ContValidation = styled.View`
    alignItems: 'center',
    marginTop: 20`;

export const TextCodeSentTitle = styled.Text`fontFamily: 'Roboto'`;

export const ButtonStyled = styled.TouchableOpacity`
        backgroundColor: ${buttonColor},
        width: '90%',
        height: 52,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginBottom: 10,
        bottom: 15,
        marginTop: 100
    `;

export const InputValidationCode = styled.TextInput`
    borderBottomWidth: 1,
    borderBottomColor: '#C6CBD4',
    textAlign: 'center',
    fontSize: 22,
    marginLeft: 10`;
