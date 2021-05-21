import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import server from '../api';

export interface MapState {
  markers?: any[];
  mapLevel?: number;
  sort?: string | null;
  filter?: any;
  latLng?: number[];
  width?: number[];
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
  latLng: [37.489455183958114, 126.722336451675],
  width: [37.46195123771726, 37.51695659436168],
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
    postData: (state, action: PayloadAction<MapState>) => {
      state.talentData = action.payload.talentData;
    },
    setMapConfig: (state, action: PayloadAction<MapState>) => {
      const { mapLevel, latLng, width } = action.payload;
      state.mapLevel = mapLevel;
      state.latLng = latLng;
      state.width = width;
    },
    handleSort: (state, action: PayloadAction<MapState>) => {
      state.sort = action.payload.sort;
    },
    handleFilter: (state, action: PayloadAction<MapState>) => {
      state.filter = action.payload.filter;
    },
  },
});

export const { postData, setMapConfig, handleSort, handleFilter } = mapSlice.actions;
export default mapSlice.reducer;
