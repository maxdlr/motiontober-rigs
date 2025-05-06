<script lang="ts" setup>
import { ref, Ref } from "vue";
import { JOLIEBOULE } from "../../jsx/aeft/Rigs/JolieBoule/enums/maxOrbeNames";
import { evalES } from "../lib/utils/bolt";
import settings from "./settings.vue";
import RigButton from "./components/RigButton.vue";
import darkModeButton from "./components/darkModeButton.vue";

const isSettingsEnabled: Ref<boolean> = ref(false);
const isDarkMode = ref(false);

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value;
}

const addJolieBoule = () => {
  evalES("rigs().createJolieBoule()");
}

const openSettings = () => {
  isSettingsEnabled.value = true;
}
</script>

<template>
  <main class="h-[100vh] max-sm:p-1 p-2" :class="[isDarkMode ? 'bg-[#0000C2]' : 'bg-[#FFD052]']">
    <section class="flex flex-wrap justify-between items-center gap-2 max-sm:hidden">
      <div>
        <span class="text-sm font-bold text-[#0000C2]">Motiontober Rigs ♥ </span>
      </div>
      <span class="text-[#0000C2] font-bold opacity-50 max-sm:hidden"><a class="underline"
          href="https://motion.maxdlr.com">Maxdlr</a>
      </span>
    </section>

    <section class="transition-all">
      <settings v-if="isSettingsEnabled" v-model:isOpen="isSettingsEnabled" :isDarkMode="isDarkMode" />
    </section>

    <section class="flex flex-wrap justify-start items-start gap-3 p-2">
      <RigButton @click="addJolieBoule" :label="JOLIEBOULE" />
      <darkModeButton @toggle="toggleDarkMode" />

      <button class="self-center" @click="openSettings"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
          :fill="isDarkMode ? '#FFD052' : '#0000C2'" class="bi bi-gear-fill" viewBox="0 0 16 16">
          <path
            d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z" />
        </svg></button>
    </section>
  </main>
</template>
