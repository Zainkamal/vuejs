<script setup>
//import HelloWorld from './components/HelloWorld.vue'
//import TheWelcome from './components/TheWelcome.vue'
import Header from "./components/Header.vue";

</script>

<template>
  <div class="container">
    <Header />
    <Header nama="sem" />
    <main>
      <h3>ABOUT ME</h3>
      <div class="about">
        <div class="me">
          <p>
            Hello! Nama saya Milfin Zainul Asiqin sebagai mahasiswa aktif
            semester 7 universitas nurul jadid yang ikut program bootcemp pada
            semester ini dengan mengambil bidang front end developer,dalam
            pelatihan ini ada 2 sesi,yaitu sesi pertama pembelajaran selama 3
            bulan dan pengerjaan projeck kordinasi pesantren wali santri
          </p>
        </div>
        <div class="judul">
          <p>umur:21</p>
          <p>gmail:milfinzain@gmail.com</p>
          <p>universitas:Nurul jadid</p>
          <p>no.Hp:082228124176</p>
        </div>
      </div>
      <h3>KONTAK</h3>
      <div class="kotak">
        <form action="">
          <div class="atas">
            <input type="text" placeholder="your name" />
            <input type="text" placeholder="your gmail" />
          </div>
          <textarea name="" id="" cols="40" rows="7" placeholder="your messenger"></textarea>
        </form>
        <div class="alm">
          <h4>ADDress</h4>
            <p>Patemon,bungatan,situbondo</p>
            <h4>Phone</h4>
              <p>082228124176</p>
              <h4>Email</h4>
                <p>milfinzain@gmail.com</p>
        </div>
  
      </div>
      <button style="margin:2px 15px;">Submit</button>
    </main>
  </div>

</template>

<style>
</style>
