import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface MapState {
  map: any;
  markers: any[];
  mapLevel: number;
  infowindow: any;
  sort?: string | null;
  filter?: string[] | null;
  latLng: number[];
  width: number[];
  talentData: {
    _id: string;
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
  map: '',
  markers: [],
  mapLevel: 6,
  infowindow: null,
  sort: null,
  filter: null,
  latLng: [37.489457, 126.7223953],
  width: [37.4825775166787, 37.49633289086903],
  talentData: [
    {
      _id: '',
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
  reducers: {},
});

export default mapSlice.reducer;
