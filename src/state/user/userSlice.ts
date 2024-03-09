import { apiSlice } from "../apiSlice";
import { USERS_URL } from "../../constants";

const userApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: (data:any) => ({
                url: `${USERS_URL}/login`,
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "Accept": "*/*",
                    "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
                },
                method: "POST",
                body: data,
                credentials: "include"
            }),
        }),
        forgotPassword: builder.mutation({
            query: (data: any) => ({
                url: `${USERS_URL}/forgot-password`,
                method: "POST",
                body: data
            })
        }),
        resetPassword: builder.mutation({
            query: (data: any) => ({
                url: `${USERS_URL}/reset-password/${data.resetToken}`,
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "Accept": "*/*",
                    "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
                },
                method: "PATCH",
                body: {
                    password: data.password
                },
                credentials: "include"
            })
        }),
        register: builder.mutation({
            query: (data: any) => ({
                url: `${USERS_URL}/register`,
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "Accept": "*/*",
                    "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
                },
                method: "POST",
                body: data,
                credentials: "include"
            })
        })
    }),
})

export const { 
    useLoginMutation, 
    useForgotPasswordMutation, 
    useResetPasswordMutation,
    useRegisterMutation
} = userApiSlice;