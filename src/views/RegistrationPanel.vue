<template>
  <div>
    <button
      class="cta-button signup-button"
      @click="registrationDialog = true"
    >
      Записаться на тренировку
    </button>

    <v-dialog
      v-model="registrationDialog"
      width="500"
    >
      <v-card>
        <v-card-title>
          Форма записи
        </v-card-title>
        <v-card-text style="gap: 8px; display: grid">
          <v-text-field
            v-model="fullName"
            :rules="[(value) => !!value || 'Поле обязательно для заполнения']"
            hide-details="auto"
            label="ФИО"
            variant="outlined"
          />
          <v-text-field
            v-model="phone"
            :rules="[(value) => !!value || 'Поле обязательно для заполнения']"
            hide-details="auto"
            label="Телефон"
            variant="outlined"
          />
          <v-select
            v-model="group"
            :items="['Взрослая', 'Детская']"
            label="Группа"
            variant="outlined"
          />
        </v-card-text>
        <v-card-actions>
          <v-btn
            color="orange-darken-2"
            text="Отправить"
            variant="flat"
            @click="onSubmit"
          />
          <v-btn
            color="orange-darken-2"
            text="Отмена"
            variant="text"
            @click="onCloseDialog"
          />
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "RegistrationPanel",
  data: () => ({
    registrationDialog: false,
    fullName: '',
    phone: '',
    group: 'Взрослая'
  }),
  methods: {
    ...mapActions('registrationStore', ['CREATE_REGISTRATION']),
    async onSubmit() {
      if (!this.fullName || !this.phone) {
        return alert('Не заполнены обязательные поля');
      }

      try {
        await this.CREATE_REGISTRATION({
          FullName: this.fullName,
          Phone: this.phone,
          Group: this.group
        });
        alert('Заявка успешно отправлена!');
        this.onCloseDialog();
      } catch (error) {
        console.error('Ошибка при создании заявки:', error);
        alert('Произошла ошибка при отправке заявки');
      }
    },
    onCloseDialog() {
      this.fullName = '';
      this.phone = '';
      this.group = 'Взрослая';
      this.registrationDialog = false;
    }
  }
}
</script>

<style scoped>
.cta-button {
  display: inline-block;
  padding: 12px 30px;
  background-color: #b88218;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  font-weight: lighter;
  transition: background-color 0.3s;
  border: none;
  cursor: pointer;
}

.cta-button:hover {
  background-color: #9f6236;
}
</style>