<template>
  <base-modals
    title="Регистрация"
    @close="$emit('close', false)"
    :isOpen="isOpen"
    :action="register"
  >
    <form class="row g-3">
      <div class="modal-register">
        <div class="modal-left">
          <div class="mb-3" v-for="item in modalLeftData" :key="item.id">
            <label :for="item.name" class="form-label form-lable--required">{{
              item.label
            }}</label>

            <div class="phone-wrapper" v-if="item.name === 'phone'">
              <select class="form-select form-select--code">
                <option value="+7" selected disabled>+7</option>
              </select>
              <input
                type="text"
                class="form-control form-control--phone"
                :class="{ 'form-control--error': v$[item.name].$error }"
                id="phone"
                v-model="state[item.name]"
                :placeholder="item.placeholder"
              />
            </div>

            <input
              v-else
              :type="item.type"
              class="form-control"
              :class="{ 'form-control--error': v$[item.name].$error }"
              :id="item.name"
              v-model="state[item.name]"
              :placeholder="item.placeholder"
              required
            />
            <div
              class="valid-error"
              v-for="err in v$[item.name].$errors"
              :key="err.$uid"
            >
              {{ err.$message }}
            </div>
          </div>
        </div>
        <div class="modal-right">
          <div class="mb-3" v-for="item in modalRightData" :key="item.id">
            <label :for="item.name" class="form-label">{{ item.label }}</label>
            <select class="form-select" v-model="region" :id="item.name">
              <option selected disabled :value="item.selectDefault.value">
                {{ item.selectDefault.text }}
              </option>
              <option
                :value="region.id"
                v-for="region in getSelectItems(item)"
                :key="region.id"
              >
                {{ region.name }}
              </option>
            </select>
          </div>
          <div class="mb-3">
            <label for="city" class="form-label">Город</label>
            <select
              class="form-select"
              id="city"
              v-model="state.city"
              :disabled="region <= 0"
              @change="setPostalCode"
            >
              <option selected disabled value="0">Выберите город</option>
              <option :value="city.id" v-for="city in cities" :key="city.id">
                {{ city.name }}
              </option>
            </select>
          </div>
          <!-- <div class="mb-3">
            <label for="post-code" class="form-label">Индекс</label>
            <input
              type="text"
              class="form-select"
              id="post-code"
              placeholder="000000"
              v-model="state.postal_code"
            />
          </div> -->
          <div class="mb-3">
            <label for="formFile" class="form-label">Аватар</label>
            <input
              class="form-control"
              ref="avatar"
              type="file"
              id="formFile"
              @change="loadFile"
            />
          </div>
        </div>
      </div>
    </form>
  </base-modals>
</template>

<script>
import baseModals from "./base-modals/base-modals.vue";
import { mapActions } from "vuex";
import { REQUEST_REGISTER } from "@/store/action-types";
import { ref, toRefs, watch, reactive, computed } from "vue";
import useVuelidate from "@vuelidate/core";
import { getRegions, getCities } from "@/api/info";
import { modalLeftData, modalRightData } from "./_data/register-modal-data";
import {
  required,
  email,
  helpers,
  minLength,
  maxLength,
  numeric,
  sameAs,
} from "@vuelidate/validators";
export default {
  components: { baseModals },
  name: "RegisterModal",
  props: {
    isOpen: {
      type: Boolean,
    },
  },
  data() {
    return {
      modalLeftData,
      modalRightData,
      user: null,
    };
  },
  methods: {
    ...mapActions({ reqRegister: REQUEST_REGISTER }),
    async register() {
      this.v$.$validate();

      if (!this.v$.$error) {
        if (this.state.password === this.state.confirm_password) {
          if (this.state.city === 0) {
            const { confirm_password, city, ...newUser } = this.state;
            const res = await this.reqRegister(newUser);

            if (res) this.$emit("close", false);
          } else {
            const { confirm_password, ...newUser } = this.state;
            console.log(newUser);
          }
        }
      }
    },
  },
  setup(props, context) {
    const { isOpen } = toRefs(props);
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

    const getSelectItems = computed(() => (item) => {
      if (item.name === "region") return regions.value;
      if (item.name === "city") return cities.value;
    });

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

    watch(isOpen, (isOpen) => {
      if (isOpen) {
        getRegionsList();
      }
    });

    watch(region, getCitiesList);

    return {
      regions,
      region,
      cities,
      setPostalCode,
      state,
      v$,
      getSelectItems,
    };
  },
};
</script>

<style lang="scss">
.modal-register {
  min-width: 600px;

  display: flex;
  justify-content: space-between;
}

.modal-left {
  flex-grow: 1;
}

.modal-right {
  max-width: 50%;
  padding-left: 20px;
}

.form-lable--required {
  &::after {
    content: "*";
    color: #dc3545;
  }
}

.valid-error {
  width: 100%;
  margin-top: 0.25rem;
  font-size: 0.875em;
  color: #dc3545;
}

.form-control--error {
  border-color: #dc3545;
}

.phone-wrapper {
  display: flex;
}

.form-control--phone {
  flex-grow: 2;
}

.form-select--code {
  width: auto;
}
</style>
