<template>
  <div class="flex flex-col h-screen overflow-hidden">
    <EditorHeader />
    <main class="flex-1 min-h-0 overflow-hidden">
      <slot />
    </main>
    <EditorFooter />
  </div>
</template>
