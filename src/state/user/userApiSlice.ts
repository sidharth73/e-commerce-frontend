import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

interface User {
    name: string,
    email: string,
    password: string
}

const userInfo = localStorage.getItem("userInfo")
const initialState = {
    userInfo: userInfo ? JSON.parse(userInfo) : null
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            state.userInfo = action.payload
            localStorage.setItem("userInfo", JSON.stringify(action.payload))

            const expirationTime = new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000);
            localStorage.setItem("expirationTime", expirationTime.toString());
        },
    },
    // extraReducers: (builder) => {
    //     builder.addCase(logIn.pending, (state, action) => {
    //         console.log("pending");
    //     }).addCase(logIn.fulfilled, (state, action) => {
    //         state.name = action.payload.name;
    //         state.email = action.payload.email;
    //         state.password = action.payload.password;
    //     }).addCase(logOut.fulfilled, (state, action) => {
    //         state.name = action.payload.name;
    //         state.email = action.payload.email;
    //         state.password = action.payload.passwod;
    //     })
    // }
});

// export const logIn = createAsyncThunk(
//     "auth/logIn",
//     async (credentials: User) => {
//         await new Promise((resolve) => setTimeout(resolve, 2000));
//         return credentials;
//     }
// )

// export const logOut = createAsyncThunk(
//     "auth/logOut",
//     async () => {
//         return {
//             name: "",
//             email: "",
//             passwod: ""
//         }
//     }
// )

export const { setCredentials } = userSlice.actions;
export default userSlice.reducer;