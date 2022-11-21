<script setup></script>
<template>
  <header style="box-shadow: 2px 2px 8px rgb(68, 66, 66)">
    <nav class="navbar bg-light" style="padding: 20px 0">
      <div class="container-fluid">
        <a class="navbar-brand" href="#" style="display: flex; font-size: 24px">
          <img
            src="../assets/download-removebg-preview.png"
            alt="Logo"
            width="150"
            height="70"
            class="d-inline-block align-text-top"
          />MYJA (MYCHAT UNUJA)
        </a>
        <ul class="nav justify-content-end">
          <li class="nav-item">
            <router-link class="nav-link active" to="/home">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/cv">Profil</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/Pulsa">Projeck</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/Contak">Contak</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/list">List</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/artikel">Artikel</router-link>
          </li>
        </ul>
      </div>
    </nav>
  </header>
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
