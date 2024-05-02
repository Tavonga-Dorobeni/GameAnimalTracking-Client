import animal_locationService from "../../../services/animal_location.service";

export default {
  state: {
    animal_locations: [],
  },

  //********************************************************************GETTERS*****************************************************************************************
  //********************************************************************************************************************************************************************

  getters: {
    allAnimalLocations: (state) => state.animal_locations,
    sortedAnimalLocations: (state) => state.animal_locations.filter(a => a.lat != 0 && a.lng != 0).sort((e1, e2) => (new Date(e1.created_date).getTime() < new Date(e2.created_date).getTime()) ? 1 : (new Date(e1.created_date).getTime() > new Date(e2.created_date).getTime()) ? -1 : 0),
    // unconfirmedDeposits: (state) => {
    //   return [
    //     state.animal_locations
    //       .filter((t) => t.CheckerID == 0)
    //       .filter((t) => t.TransactionCodeID == 1),
    //     [(state.animal_locations.title = "Contributions")],
    //   ];
    // },
  },

  //********************************************************************ACTIONS*****************************************************************************************
  //********************************************************************************************************************************************************************

  actions: {
    // animal_locations actions

    createAnimalLocation({ commit }, data) {
      return animal_locationService.create(data).then(
        (response) => {
          commit("newAnimalLocation", response.data);
          return Promise.resolve(response);
        },
        (error) => {
          return Promise.reject(error);
        }
      );
    },
    getAllAnimalLocations({ commit }) {
      return animal_locationService.getAll().then(
        (response) => {
          commit("setAnimalLocations", response.data);
          return Promise.resolve(response);
        },
        (error) => {
          return Promise.reject(error);
        }
      );
    },
    updateAnimalLocation({ commit }, data) {
      return animal_locationService.update(data.AnimalLocationID, data).then(
        (response) => {
          commit("updAnimalLocation", data);
          return Promise.resolve(response);
        },
        (error) => {
          return Promise.reject(error);
        }
      );
    },
    deleteAnimalLocation({ commit }, data) {
      return animal_locationService.delete(data.AnimalLocationID).then(
        (response) => {
          commit("dltAnimalLocation", data);
          return Promise.resolve(response);
        },
        (error) => {
          return Promise.reject(error);
        }
      );
    },
  },

  //********************************************************************MUTATIONS***************************************************************************************
  //********************************************************************************************************************************************************************
  mutations: {
    // AnimalLocation EVENTS

    setAnimalLocations: (state, animal_locations) =>
      (state.animal_locations = animal_locations),
    newAnimalLocation: (state, newAnimalLocation) =>
      state.animal_locations.unshift(newAnimalLocation.animal_location),
    updAnimalLocation: (state, updatedAnimalLocation) => {
      const index = state.animal_locations.findIndex(
        (c) => c.AnimalLocationID === updatedAnimalLocation.AnimalLocationID
      );
      if (index !== -1) {
        state.animal_locations.splice(index, 1, updatedAnimalLocation);
      }
    },
    dltAnimalLocation: (state, AnimalLocation) => {
      const index = state.animal_locations.findIndex(
        (c) => c.AnimalLocationID === AnimalLocation.AnimalLocationID
      );
      if (index !== -1) {
        state.animal_locations.splice(index, 1);
      }
    },
  },
};
