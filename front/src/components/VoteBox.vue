<template>
  <slot :resourceId="resourceId" :likes="likes" :dislikes="dislikes" :likesPercent="likesPercent"
        :isVoted="isVoted" :voteLike="voteLike" :voteDislike="voteDislike"
  />
</template>

<script setup lang="ts">
import { LikesPercent } from '@/js/helpers/Formatters'
import { ref, withDefaults, defineProps, defineEmits, computed, reactive } from 'vue'

type ComponentProperties = {
  resourceId: number|string;
  sendUrl: string;
  likes?: number;
  dislikes?: number;
}
type VoteResult = {
  resourceId: number|string;
  action: 'up'|'down'
}
type ApiPayload = {
  id: number|string;
  action: 'up'|'down'
}

const props = withDefaults(defineProps<ComponentProperties>(), {
  likes: 0,
  dislikes: 0
})

const emit = defineEmits<{
  (e: 'voted', data: VoteResult): void
}>()

const getFromStorage = (key: string): Array<number|string> => {
  const record = localStorage.getItem(key)

  if (record) {
    return JSON.parse(record)
  }

  return []
}

const setToStorage = (key: string, payload: Array<number|string>): void => {
  return localStorage.setItem(key, JSON.stringify(payload))
}

const likes = ref<number>(props.likes)
const dislikes = ref<number>(props.dislikes)
const likesPercent = computed((): number => LikesPercent(likes.value, dislikes.value))
const votedResources: Array<number|string> = reactive(getFromStorage('votedResources'))

const notifyBackend = (apiUrl: string, payload: ApiPayload): Promise<Response> => {
  return fetch(apiUrl, {
    method: 'POST',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText)
      }

      return response
    })
}

const voteLike = () => {
  if (isVoted()) {
    return
  }

  const payload: ApiPayload = { id: props.resourceId, action: 'up'}

  notifyBackend(props.sendUrl, payload)
    .then(() => {
      likes.value += 1
      votedResources.push(props.resourceId)
      setToStorage('votedResources', votedResources)
      emit('voted', { resourceId: props.resourceId, action: 'up'})
    })
    /*.catch((err) => {
      console.error(err)
    })*/
}

const voteDislike = () => {
  if (isVoted()) {
    return
  }

  const payload: ApiPayload = { id: props.resourceId, action: 'down'}

  notifyBackend(props.sendUrl, payload)
    .then(() => {
      dislikes.value += 1
      votedResources.push(props.resourceId)
      setToStorage('votedResources', votedResources)
      emit('voted', { resourceId: props.resourceId, action: 'down'})
    })
    /*.catch((err) => {
      console.error(err)
    })*/
}

const isVoted = (): boolean => {
  return votedResources.indexOf(props.resourceId) !== -1
}
</script>
