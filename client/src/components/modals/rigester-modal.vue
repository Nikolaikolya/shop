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
import { toRefs, watch } from "vue";

import { modalLeftData, modalRightData } from "./_data/register-modal-data";

import useRegisterModal from "@/composables/use-register-modal";
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

    const {
      cities,
      state,
      regions,
      region,
      v$,
      getRegionsList,
      getCitiesList,
      setPostalCode,
      getSelectItems,
    } = useRegisterModal();

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
@import "./register-modal";
</style>
