<template>
  <div class="flag-form">
    <div class="flag-form__body" v-if="reported === true">
      <div class="flag-form__reported-message">
        Ваша заявка отправлена и будет обработана в ближайшее время.
      </div>
    </div>
    <div class="flag-form__body" v-else>
      <ul class="flag-form-errors" v-if="hasErrors()">
        <li v-for="(error, index) in errors" :key="index" class="flag-form-errors__message">
          {{ error }}
        </li>
      </ul>

      <ul class="flag-reason-list">
        <li v-for="(reason, index) in reasonTypes" :key="index" class="flag-reason-list__reason" @click="selectReason(reason)">
          <label class="flag-reason-list__label">
            <input class="flag-reason-list__radio" type="radio" name="flag_type"><span>{{ reason.label }}</span>
          </label>
          <ul class="flag-reason-list" v-if="reason === selectedReason && reason.items.length > 0">
            <li v-for="(reasonItem, index) in reason.items" :key="index" class="flag-reason-list__reason" @click.prevent="selectSubReason(reasonItem)">
              <label class="flag-reason-list__label">
                <input class="flag-reason-list__radio" type="radio" name="flag_type_detail" :checked="reasonItem === selectedSubReason"><span>{{ reasonItem.label }}</span>
              </label>
            </li>
          </ul>
        </li>
      </ul>

      <div class="flag-form__row">
        <label class="flag-form__label" for="flagEmail">Email</label>
        <input type="email" v-model="email" id="flagEmail" class="flag-form__input" placeholder="Пожалуйста, оставьте свой email">
      </div>

      <div class="flag-form__row">
        <label class="flag-form__label" for="flagReason">Причина</label>
        <textarea v-model="reason" id="flagReason" rows="5" class="flag-form__textarea" placeholder="Ваш комментарий"></textarea>
      </div>
    </div>

    <footer class="flag-form__footer" v-if="reported === false">
      <button class="btn btn-primary flag-form__btn" @click="submitReport()" v-if="reported === false">Отправить</button>
      <button class="btn btn-primary flag-form__btn" @click="close()">Закрыть</button>
    </footer>
  </div>
</template>

<script>

import config from '../../configs/app'

export default {
  name: 'FlagForm',
  props: {
    videoId: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      reason: '',
      email: '',
      selectedReasonType: {},
      errors: [],
      reported: false,
      selectedReason: {},
      selectedSubReason: {},
      reasonTypes: [
        {
          type: 'inappropriate',
          label: 'Нежелательный контент',
          comment: 'Сцены насилия, реальный инцест, акты дефекации и т.д.',
          items: []
        },
        { type: 'underage', label: 'Несовешеннолетние актеры', comment: '', items: [] },
        {
          type: 'broken',
          label: 'Проблемы с воспроизведением',
          comment: '',
          items: [
            { type: 'broken.notload', label: 'Видео не работает', comment: '' },
            { type: 'broken.slow', label: 'Тормозит загрузка', comment: '' },
            { type: 'broken.broken', label: 'Битое видео', comment: 'Контент отображается частично, обрывается, имеются артефакты' },
            { type: 'broken.other', label: 'Другое (укажите в комментарии)', comment: '' }
          ]
        },
        { type: 'privacy', label: 'Правообладание\\копирайт (Требуется email)', comment: '', items: [] },
        { type: 'other', label: 'Другое (укажите причину)', comment: '', items: [] }
      ]
    }
  },
  mounted () {
    /*this.$on('reported', function () {
      this.reported = true
      this.resetData()

      setTimeout(() => {
        this.$emit('close')
        this.$root.$emit('flag-close')
      }, 3000)
    })*/
  },
  watch: {
    selectedReason (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.selectedSubReason = {}
      }
    }
  },
  methods: {
    close () {
      this.$emit('close')
      this.$root.$emit('flag-close')
    },
    isReasonSelected () {
      return this.reasonTypes.indexOf(this.selectedReason) !== -1
    },
    isValidEmail (email) {
      const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

      return re.test(String(email).toLowerCase())
    },
    selectReason (reason) {
      this.selectedReason = reason
    },

    selectSubReason (subReason) {
      this.selectedSubReason = subReason
    },
    hasErrors () {
      return this.errors.length > 0
    },
    clearErrors () {
      this.errors = []
    },
    resetData () {
      this.reason = ''
      this.errors = []
      this.selectedReason = {}
      this.selectedSubReason = {}
    },
    isValidForm () {
      this.clearErrors()

      if (!this.isReasonSelected()) {
        this.errors.push('Выберите один из вариантов для жалобы')

        return false
      }

      if (this.selectedReason.type === 'privacy' && !this.isValidEmail(this.email)) {
        this.errors.push('Укажите вашу электронную почту')
      }

      if (this.selectedReason.type === 'privacy' && this.reason.trim() === '') {
        this.errors.push('Опишите текстом причину вашей жалобы')
      }

      if (this.selectedReason.type === 'other' && this.reason.trim() === '') {
        this.errors.push('Опишите текстом причину вашей жалобы')
      }

      if (this.selectedReason.items.length > 0 && Object.keys(this.selectedSubReason).length === 0) {
        this.errors.push('Укажите причину более точно')
      }

      if (this.selectedReason.items.length > 0 && Object.keys(this.selectedSubReason).length > 0) {
        if (this.selectedSubReason.type === 'broken.other' && this.reason.trim() === '') {
          this.errors.push('Опишите текстом причину вашей жалобы')
        }
      }

      return !this.hasErrors()
    },
    submitReport () {
      if (!this.isValidForm()) {
        return
      }

      let subReason = {}
      if (Object.keys(this.selectedSubReason).length !== 0) {
        subReason = {
          type: this.selectedSubReason.type,
          label: this.selectedSubReason.label
        }
      }

      const report = {
        type: this.selectedReason.type,
        reason: this.reason,
        subReason: subReason,
        email: this.email,
        id: this.videoId,
        title: document.title,
        url: document.location.href
      }

      fetch(config.abuseUrl, {
        cache: 'no-cache',
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(report)
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(response.statusText)
          }

          return response
        })
        .then(response => response.json())
        .then(() => {
          this.$emit('reported')
        })
        .catch((err) => {
          console.error(err)
          this.$emit('reported')
        })
    }
  }
}
</script>

<style lang="scss">

</style>
