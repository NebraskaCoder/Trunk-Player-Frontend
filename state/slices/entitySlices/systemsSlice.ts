import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

import type { System } from "@/types/api/System";
import type { AppState } from "@/state/store";

const systemsAdapter = createEntityAdapter({
  selectId: (system: System) => system.UUID,
  sortComparer: (a, b) => a.name.localeCompare(b.name),
});

const initialState = systemsAdapter.getInitialState();

const systemsSlice = createSlice({
  name: "systems",
  initialState,
  reducers: {
    addSystem: systemsAdapter.addOne,
    addSystems: systemsAdapter.addMany,
    updateSystem: systemsAdapter.updateOne,
    removeSystem: systemsAdapter.removeOne,
  },
});

export const { addSystem, addSystems, updateSystem, removeSystem } =
  systemsSlice.actions;

export default systemsSlice.reducer;

export const {
  selectById: selectSystemById,
  selectIds: selectSystemIds,
  selectEntities: selectSystemEntities,
  selectAll: selectAllSystems,
  selectTotal: selectTotalSystems,
} = systemsAdapter.getSelectors<AppState>((state) => state.systems);
