import { RouteProp } from "@react-navigation/native";

type ScreenParams = {
    ["LoginBySmsScreen"] : {
        environment : string,
        deviceType: string,
        deviceToken:string,
        countryArea:string,
    }
}

export type LoginBySmsScreenParams = RouteProp<ScreenParams,'LoginBySmsScreen'>;