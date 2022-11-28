<script setup>
import axios from "axios";
import { onMounted, reactive } from "vue";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";

const databuku = reactive({
  buku: [],
});

const getbuku = async () => {
  await axios
    .get("http://localhost:3000/buku")
    .then((response) => {
      databuku.buku = response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};
//delet
// const delet = async (id) => {
//   axios
//     .delete(`http://localhost:3000/buku/${id}`)
//     .then((res) => {
//       alert("apakah anda ingin menghapus");
//       getbuku();
//     })
//     .catch((error) => {
//       alert(error);
//     });
// };
const delet = async (id) => {
  Swal.fire({
    title: "Apakah anda yakin?",
    text: "Data yang di hapus",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      axios
        .delete("http://localhost:3000/buku/" + id)
        .then((res) => {
          Swal.fire({
            title: res.status,
            text: "Data berhasil di hapus",
            icon: "success",
            confirmButtonText: "OK",
          }).then((result) => {
            if (result.isConfirmed) {
              getbuku();
            }
          });
        })
        .catch(() => {
          Swal.fire({
            title: "Gagal",
            text: "Data gagal di hapus",
            icon: "error",
            confirmButtonText: "OK",
          });
        });
    }
  });
};
onMounted(() => {
  getbuku();
});
const router = useRouter();
</script>
<template>
  <header>
    <div class="top">
      <img style="margin-bottom: 10px" src="../assets/buku.jfif" alt="" />
      <button type="button" class="btn btn-primary">
        <RouterLink class="nav-link active" to="/tambahbuku">Tambah</RouterLink>
      </button>
    </div>
    <div class="bottom">
      <table class="table">
        <thead>
          <tr class="table-primary">
            <th scope="col">#</th>
            <th scope="col">Cover</th>
            <th scope="col">Nama Buku</th>
            <th scope="col">Penulis</th>
            <th scope="col">Katagori</th>
            <th scope="col">Active</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in databuku.buku" :key="item.id">
            <th scope="row">{{ index + 1 }}</th>
            <td><img :src="item.cover" alt="" class="cover" /></td>
            <td>{{ item.judul }}</td>
            <td>{{ item.penulis }}</td>
            <td>
              <span v-for="(kategori, index) in item.katagori" :key="index">
                {{ kategori
                }}<span v-if="index + 1 < item.katagori.length">, </span>
              </span>
            </td>
            <td>
              <button
                @click="router.push('/databuku/' + item.id)"
                type="button"
                class="btn btn-primary"
              >
                🕹 Edit
              </button>
              <button
                @click="delet(item.id)"
                type="button"
                class="m-2 btn btn-primary"
              >
                ✂Delet
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </header>
</template>
<style scoped>
header {
  width: 80%;
  padding: 15px 20px;
  box-shadow: 2px 3px 7px slategrey;
  margin: 10px auto;
}
header .top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
header .top img {
  width: 100px;
  height: 100px;
  margin-right: 20px;
}
.cover {
  width: 65px;
  height: 65px;
}
</style>
