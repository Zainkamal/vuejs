<script setup></script>
<template>
  <main style="display: flex; justify-content: center; margin-left: 60px">
    <div class="left">
      <img
        src="../assets/ttt.svg"
        alt=""
        style="width: 400px; height: 400px; margin: 50px 50px"
      />
    </div>
    <div class="right">
      <h3
        style="
          text-align: center;
          padding: 30px;
          border-bottom: 1px solid black;
        "
      >
        WELCOME TO MEJA
      </h3>
      <p style="max-width: 70vh; margin-top: 30px">
        MEJA (diucapkan sebagai mychet unuja) adalah aplikasi komunikasi untuk
        orang-orang terhubung dengan mahasiswa dan dosen melalui fitur obrolan
        yang menyenangkan. Pada tahun 2018, aplikasi Meja adalah salah satu
        aplikasi pengiriman pesan gratis yang paling banyak diunduh di wilayah
        Kampus.
      </p>
    </div>
  </main>
</template>
<style scoped>
.container-fluid ul li {
  padding: 0 30px;
  box-shadow: 2px 3px 10px rgb(66, 66, 66);
  margin-right: 10px;
}
.container-fluid ul li a {
  color: black;
  font-size: 20px;
}
.container-fluid ul li:hover {
  transition: 0.5s;
  background-color: rgb(78, 76, 76);
  color: white;
}
.container-fluid ul li a:hover {
  color: white;
}
</style>
