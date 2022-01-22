import { ref, toRefs, watch, reactive, computed } from "vue";

import useVuelidate from "@vuelidate/core";
import { getRegions, getCities } from "@/api/info";

import {
  required,
  email,
  helpers,
  minLength,
  maxLength,
  numeric,
} from "@vuelidate/validators";

const useRegisterModal = () => {
  const regions = ref([]);
  const cities = ref([]);
  const region = ref(0);
  const state = reactive({
    city: 0,
    password: null,
  });

  const rules = {
    name: {
      required: helpers.withMessage("Обязательное поле", required),
      minLength: helpers.withMessage("Не меньше 6 символов", minLength(6)),
    },
    phone: {
      required: helpers.withMessage("Обязательное поле", required),
      numeric: helpers.withMessage("Только цифры", numeric),
      minLength: helpers.withMessage("Не меньше 10 символов", minLength(10)),
      maxLength: helpers.withMessage("Не больше 10 символов", maxLength(10)),
    },
    email: {
      required: helpers.withMessage("Обязательное поле", required),
      email,
    },
    password: {
      required: helpers.withMessage("Обязательное поле", required),
      minLength: helpers.withMessage("Не меньше 6 символов", minLength(6)),
    },
    confirm_password: {
      required: helpers.withMessage("Обязательное поле", required),
      minLength: helpers.withMessage("Не меньше 6 символов", minLength(6)),
    },
  };

  const v$ = useVuelidate(rules, state);

  const getRegionsList = async () => {
    const data = await getRegions();
    if (data) regions.value.push(...data.regions);
  };

  const getCitiesList = async () => {
    const data = await getCities(region.value);
    if (data) cities.value = data.cities;
  };

  const setPostalCode = () => {
    const city = cities.value.filter((city) => city.id === state.city);
    state.postal_code = city[0].postal_code;
  };

  const getSelectItems = computed(() => (item) => {
    if (item.name === "region") return regions.value;
    if (item.name === "city") return cities.value;
  });

  return {
    regions,
    cities,
    region,
    state,
    v$,
    getRegionsList,
    getCitiesList,
    setPostalCode,
    getSelectItems,
  };
};

export default useRegisterModal;
