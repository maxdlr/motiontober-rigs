<script lang="ts" setup>
import { ref, Ref } from "vue";
import { RIG_NAME } from "../../jsx/aeft/Rigs/JolieBoule/enums/maxOrbeNames";
import { evalES } from "../lib/utils/bolt";
import settings from "./settings.vue";
import RigButton from "./components/RigButton.vue";

const isSettingsEnabled: Ref<boolean> = ref(false);

const rigs = {
  addJolieBoule: () => {
    evalES("rigs.addJolieBoule()")
  }
}

const openSettings = () => {
  isSettingsEnabled.value = true;
}
</script>

<template>
  <main class="bg-[#FFD052] h-[100vh] p-2">
    <section class="flex flex-wrap justify-between items-center gap-2">
      <div>
        <span class="text-lg font-bold text-[#0000C2]">Motiontober Rigs ♥ </span>
        <button class="text-lg font-bold text-[#0000C2]" @click="openSettings">⚙ </button>
      </div>
      <span class="text-[#0000C2] font-bold opacity-50 max-sm:hidden"><a class="underline"
          href="https://motion.maxdlr.com">Maxdlr</a>
      </span>
    </section>

    <section class="transition-all">
      <settings v-if="isSettingsEnabled" v-model:isOpen="isSettingsEnabled" />
    </section>

    <section class="flex flex-wrap justify-start items-start gap-3 p-2">
      <RigButton @click="rigs.addJolieBoule" :label="RIG_NAME" />
    </section>
  </main>
</template>
