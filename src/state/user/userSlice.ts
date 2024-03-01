import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

interface User {
    name: string,
    email: string,
    password: string
}

const initialState: User = {
    name: "",
    email: "",
    password: ""
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(logIn.pending, (state, action) => {
            console.log("pending");
        }).addCase(logIn.fulfilled, (state, action) => {
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.password = action.payload.password;
        }).addCase(logOut.fulfilled, (state, action) => {
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.password = action.payload.passwod;
        })
    }
});

export const logIn = createAsyncThunk(
    "auth/logIn",
    async (credentials: User) => {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        return credentials;
    }
)

export const logOut = createAsyncThunk(
    "auth/logOut",
    async () => {
        return {
            name: "",
            email: "",
            passwod: ""
        }
    }
)

export default userSlice.reducer;