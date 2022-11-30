import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchLaunchers} from "./launchersApi";

export const getLaunchers = createAsyncThunk(
    'launchers',
    async (_: void, { rejectWithValue }: any) => {
        try {
            const response = await fetchLaunchers();
            return response.success ? response : rejectWithValue(response);
        } catch (error: any) {
            return rejectWithValue({ message: "Error occured" })
        }
    }
)