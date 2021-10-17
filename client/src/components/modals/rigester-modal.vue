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
          <div class="mb-3">
            <label for="name" class="form-label form-lable--required"
              >Имя</label
            >
            <input
              type="text"
              class="form-control"
              :class="{ 'form-control--error': v$.name.$error }"
              id="name"
              v-model="state.name"
              placeholder="Nikolai"
              required
            />
            <div
              class="valid-error"
              v-for="err in v$.name.$errors"
              :key="err.$uid"
            >
              {{ err.$message }}
            </div>
          </div>
          <div class="mb-3">
            <label for="phone" class="form-label form-lable--required"
              >Телефон</label
            >
            <div class="phone-wrapper">
              <select class="form-select form-select--code">
                <option value="+7" selected disabled>+7</option>
              </select>
              <input
                type="text"
                class="form-control form-control--phone"
                :class="{ 'form-control--error': v$.phone.$error }"
                id="phone"
                v-model="state.phone"
                placeholder="8000000000"
              />
            </div>
            <div
              class="valid-error"
              v-for="err in v$.phone.$errors"
              :key="err.$uid"
            >
              {{ err.$message }}
            </div>
          </div>
          <div class="mb-3">
            <label for="email" class="form-label form-lable--required"
              >Емайл</label
            >
            <input
              type="email"
              class="form-control"
              :class="{ 'form-control--error': v$.email.$error }"
              id="email"
              v-model="state.email"
              placeholder="name@example.com"
            />
            <div
              class="valid-error"
              v-for="err in v$.email.$errors"
              :key="err.$uid"
            >
              {{ err.$message }}
            </div>
          </div>
          <div class="mb-3">
            <label for="password" class="form-label form-lable--required"
              >Пароль</label
            >
            <input
              type="password"
              class="form-control"
              :class="{ 'form-control--error': v$.password.$error }"
              id="password"
              v-model="state.password"
              placeholder="******"
            />
            <div
              class="valid-error"
              v-for="err in v$.password.$errors"
              :key="err.$uid"
            >
              {{ err.$message }}
            </div>
          </div>
          <div class="mb-3">
            <label
              for="password_confirm"
              class="form-label form-lable--required"
              >Повтор пароля</label
            >
            <input
              type="password"
              class="form-control"
              :class="{ 'form-control--error': v$.confirm_password.$error }"
              id="password_confirm"
              v-model="state.confirm_password"
              placeholder="******"
            />
            <div
              class="valid-error"
              v-for="err in v$.confirm_password.$errors"
              :key="err.$uid"
            >
              {{ err.$message }}
            </div>
          </div>
        </div>
        <div class="modal-right">
          <div class="mb-3">
            <label for="region" class="form-label">Регион</label>
            <select class="form-select" v-model="region" id="region">
              <option selected disabled value="0">Выберите регион</option>
              <option
                :value="region.id"
                v-for="region in regions"
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
          <div class="mb-3">
            <label for="post-code" class="form-label">Индекс</label>
            <input
              type="text"
              class="form-select"
              id="post-code"
              placeholder="000000"
              v-model="state.postal_code"
            />
          </div>
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
import { REQUEST_AUTH } from "@/store/action-types";
import { ref, toRefs, watch, reactive, computed } from "vue";
import { HTTP } from "@/helpers/Request";
import useVuelidate from "@vuelidate/core";
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
      user: null,
    };
  },
  methods: {
    ...mapActions({ reqLogin: REQUEST_AUTH }),
    async register() {
      this.v$.$validate();
      if (!this.v$.$error) {
        console.log(this.state);
      }
      // const res = await this.reqLogin(this.loginData);
      // this.$emit("close", false);
    },
  },
  setup(props, context) {
    console.log(props);

    const { isOpen } = toRefs(props);
    const regions = ref([]);
    const cities = ref([]);
    const region = ref(0);
    const state = reactive({
      city: 0,
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
      const { data } = await HTTP.get("/info/regions");
      if (data.success) regions.value.push(...data.regions);
    };

    const getCitiesList = async () => {
      const { data } = await HTTP.get(`/info/city/${region.value}`);
      if (data.success) cities.value = data.cities;
    };

    const setPostalCode = () => {
      const city = cities.value.filter((city) => city.id === state.city);
      state.postal_code = city[0].postal_code;
    };

    watch(isOpen, (isOpen) => {
      if (isOpen) {
        getRegionsList();
        console.log(context);
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
