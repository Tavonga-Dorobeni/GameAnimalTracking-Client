import animalService from "../../../services/animal.service";

export default {
  state: {
    animals: [],
  },

  //********************************************************************GETTERS*****************************************************************************************
  //********************************************************************************************************************************************************************

  getters: {
    allAnimals: (state) => state.animals,
    // unconfirmedDeposits: (state) => {
    //   return [
    //     state.animals
    //       .filter((t) => t.CheckerID == 0)
    //       .filter((t) => t.TransactionCodeID == 1),
    //     [(state.animals.title = "Contributions")],
    //   ];
    // },
  },

  //********************************************************************ACTIONS*****************************************************************************************
  //********************************************************************************************************************************************************************

  actions: {
    // animals actions

    createAnimal({ commit }, data) {
      return animalService.create(data).then(
        (response) => {
          commit("newAnimal", response.data);
          return Promise.resolve(response);
        },
        (error) => {
          return Promise.reject(error);
        }
      );
    },
    getAllAnimals({ commit }) {
      return animalService.getAll().then(
        (response) => {
          commit("setAnimals", response.data);
          return Promise.resolve(response);
        },
        (error) => {
          return Promise.reject(error);
        }
      );
    },
    updateAnimal({ commit }, data) {
      return animalService.update(data.AnimalID, data).then(
        (response) => {
          commit("updAnimal", data);
          return Promise.resolve(response);
        },
        (error) => {
          return Promise.reject(error);
        }
      );
    },
    deleteAnimal({ commit }, data) {
      return animalService.delete(data.AnimalID).then(
        (response) => {
          commit("dltAnimal", data);
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
    // Animal EVENTS

    setAnimals: (state, animals) =>
      (state.animals = animals),
    newAnimal: (state, newAnimal) =>
      state.animals.unshift(newAnimal.animal),
    updAnimal: (state, updatedAnimal) => {
      const index = state.animals.findIndex(
        (c) => c.AnimalID === updatedAnimal.AnimalID
      );
      if (index !== -1) {
        state.animals.splice(index, 1, updatedAnimal);
      }
    },
    dltAnimal: (state, Animal) => {
      const index = state.animals.findIndex(
        (c) => c.AnimalID === Animal.AnimalID
      );
      if (index !== -1) {
        state.animals.splice(index, 1);
      }
    },
  },
};
