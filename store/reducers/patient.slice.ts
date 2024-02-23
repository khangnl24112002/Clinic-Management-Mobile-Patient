import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { IPatient} from "../../types";

interface PatientState {
  patient: IPatient | null;
}

// define initial state
const initialState: PatientState = {
  patient: null,
};

export const PatientSlice = createSlice({
  name: "patient",
  initialState,
  reducers: {
    setPatient: (state, action: PayloadAction<IPatient>) => {
        state.patient = action.payload;     
    },
    
  },
});

export const { setPatient } = PatientSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.

export const patientReducer = PatientSlice.reducer;
export const PatientSelector = (state: RootState) => state?.patientReducer.patient;
