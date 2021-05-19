import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import server from '../api';

export interface MapState {
  markers?: any[];
  mapLevel?: number; //
  infowindowGroup?: any[]; //
  sort?: string | null;
  filter?: string[] | null;
  latLng?: number[]; //
  width?: number[]; //
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
  infowindowGroup: [],
  sort: null,
  filter: null,
  latLng: [37.489457, 126.7223953],
  width: [37.4825775166787, 37.49633289086903],
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

export const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    getData: (state, action: PayloadAction<MapState>) => {
      state.talentData = action.payload.talentData;
    },
    setMapConfig: (state, action: PayloadAction<MapState>) => {
      const { mapLevel, latLng, width } = action.payload;
      state.mapLevel = mapLevel;
      state.latLng = latLng;
      state.width = width;
    },
    setInfowindow: (state, action: PayloadAction<MapState>) => {
      state.infowindowGroup = [];
      state.infowindowGroup.push(action.payload.infowindowGroup);
    },
  },
});

export const { getData, setMapConfig, setInfowindow } = mapSlice.actions;
export default mapSlice.reducer;
