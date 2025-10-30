<script setup>
import { onMounted, ref } from 'vue';
import { requester } from '@/shared/lib/axios.js';
import PageTitle from '@/shared/ui/page-title.vue';
import { ProductCardList } from '@/features/products';
import { useRouter } from 'vue-router';
import InfoBlock from '@/shared/ui/info-block.vue';

const favorites = ref([]);
const isPending = ref(false);

const router = useRouter();

onMounted(async () => {
  try {
    isPending.value = true;
    const { data } = await requester.get('/favorites?_relations=products');
    favorites.value = data.map((item) => item.product);
  } catch (error) {
    console.log(error);
  } finally {
    isPending.value = false;
  }
});
</script>

<template>
  <div v-if="isPending" class="w-full flex justify-center items-center py-20">
    <span class="text-gray-500 text-lg animate-pulse">Загрузка...</span>
  </div>

  <div v-else-if="favorites.length > 0">
    <page-title title="Мои закладки" back-btn />
    <product-card-list :products="favorites" is-favorities />
  </div>

  <div v-else class="w-full h-full flex items-center justify-center mt-20">
    <info-block
      title="Закладок нет :("
      subtitle="Вы ничего не добавляли в закладки"
      image="/emoji-1.png"
    >
      <button
        @click="() => router.back()"
        class="w-full py-3 rounded-xl bg-lime-500 mt-6 text-white font-semibold disabled:bg-slate-300 transition active:-translate-y-1 cursor-pointer"
      >
        Вернуться назад
      </button>
    </info-block>
  </div>
</template>
