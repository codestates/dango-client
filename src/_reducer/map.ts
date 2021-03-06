import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface MapState {
  markers?: any[];
  mapLevel?: number;
  sort?: string | null;
  filter?: any;
  latLng?: number[];
  width?: number[];
  clickedMarkerLatLng?: number[];
  talentData?: {
    id: string;
    title: string;
    nickname: string;
    location: number[];
    category: string;
    ratings: number[];
    price: number;
    address: string;
    description: string;
  }[];
}

const initialState: MapState = {
  markers: [],
  mapLevel: 6,
  sort: null,
  filter: [],
  latLng: [37.55682745904257, 126.92371975514399],
  width: [37.531162581254904, 37.5824729630769],
  clickedMarkerLatLng: [0, 0],
  talentData: [
    {
      id: '',
      title: '',
      nickname: '',
      location: [0, 0],
      category: '',
      ratings: [0, 0],
      price: 0,
      address: '',
      description: '',
    },
  ],
};

export interface SetMapconfigPayload {
  mapLevel: number;
  latLng: number[];
  width: number[];
}

export const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    postData: (state, action: PayloadAction<MapState>) => {
      state.talentData = action.payload.talentData;
    },
    setMapConfig: (state, action: PayloadAction<SetMapconfigPayload>) => {
      const { mapLevel, latLng, width } = action.payload;
      state.mapLevel = mapLevel;
      state.latLng = latLng;
      state.width = width;
    },
    setMarkerLatLng: (state, action: PayloadAction<MapState>) => {
      state.clickedMarkerLatLng = action.payload.clickedMarkerLatLng;
    },
    handleSort: (state, action: PayloadAction<MapState>) => {
      state.sort = action.payload.sort;
    },
    handleFilter: (state, action: PayloadAction<MapState>) => {
      state.filter = action.payload.filter;
    },
  },
});

export const { postData, setMapConfig, handleSort, handleFilter, setMarkerLatLng } = mapSlice.actions;
export default mapSlice.reducer;
