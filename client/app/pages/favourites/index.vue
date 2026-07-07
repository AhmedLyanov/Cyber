<template>
  <div class="profile-page">
    <div class="profile-page__container">
      <h1 class="profile-page__title">Профиль</h1>
      <div class="profile-page__content">
        <div class="profile-page__sidebar">
          <Sidebar />
        </div>
        <div class="profile-page__main">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>