<script setup>
import { computed, reactive, watchEffect } from "vue";
const data = reactive({
  data: JSON.parse(localStorage.getItem("isi") || "[]"),
  provider: null,
  no_hp: null,
  nominal: null,
  catatan: null,
  mode: "add",
  form: null,
  selected: null,
  status: "",
  search: {
    cari: "",
    provider: "",
    status: "",
  },
});
function tambah() {
  if (data.mode === "add") {
    data.data.unshift({
      id: Math.random(),
      tanggal: new Date().toISOString(),
      provider: data.provider,
      no_hp: data.no_hp,
      nominal: data.nominal,
      status: "Pending",
      catatan: data.catatan || "-",
    });
    initdata();
  } else {
    // Carikan index dari todo.data yang akan diedit
    const i = data.data.findIndex((o) => o.id === data.selected.id);
    // Ubah data pada index tersebut
    data.data[i] = {
      tanggal: new Date().toISOString(),
      provider: data.provider,
      no_hp: data.no_hp,
      nominal: data.nominal,
      catatan: data.catatan || "-",
      status: data.status,
    };
    // Reset
    initdata();
  }
}
const menampilkandata = computed(() => {
  return data.data;
});
const initdata = () => {
  data.provider = null;
  data.no_hp = null;
  data.nominal = null;
  data.catatan = null;
  data.status = null;
  data.selected = {};
  data.mode = "add";
};
const customstatus = (status) => {
  switch (status) {
    case "Succes":
      return "text-bg-success";
    case "Pending":
      return "text-bg-warning";
    case "Cancelled":
      return "text-bg-danger";
    default:
      return "text-bg-dark";
  }
};
function deldata(idx) {
  // alert confirm
  if (confirm("Are you sure?")) {
    data.data.splice(idx, 1);
  }
}

//filterdata
const filterdata = computed(() => {
  return data.data.filter((item) => {
    if (data.search.provider) {
      if (item.provider !== data.search.provider) {
        return false;
      }
    }
    if (data.search.status) {
      if (item.status !== data.search.status) {
        return false;
      }
    }
    if (data.search.cari) {
      if (!item.no_hp.startsWith(data.search.cari)) {
        return false;
      }
    }
    return true;
  });
});
watchEffect(() => {
  localStorage.setItem("isi", JSON.stringify(data.data));
  console.log(data.data);
});
</script>
<template>
  <div class="wrap">
    {{ data.provider }}
    <header>
      <h3>📧MAMA PULSA</h3>
      <p>Beli pulsa</p>
    </header>
    <main style="display: flex">
      <div class="left">
        <h3>📳Beli Pulsa</h3>
        <h3>Provider</h3>
        <form @submit.prevent="tambah">
          <select v-model="data.provider">
            <option :value="null">pilih provider</option>
            <option value="Telkomsel">Telkomsel</option>
            <option value="Exsis">Exsis</option>
            <option value="Smartfrent">Smartfren</option>
            <option value="Xl">Xl</option>
            <option value="M3">M3</option>
          </select>
          <h3>NO.hp</h3>
          <div class="input-group mb-3">
            <span class="input-group-text">Rp</span>
            <input
              type="text"
              v-model="data.no_hp"
              class="form-control"
              aria-label="Dollar amount (with dot and two decimal places)"
            />
          </div>
          <h3>Nominal Pulsa</h3>
          <div class="input-group mb-3">
            <span class="input-group-text">+62</span>
            <input
              type="number"
              v-model="data.nominal"
              class="form-control"
              aria-label="Dollar amount (with dot and two decimal places)"
            />
          </div>
          <h3>Catatan</h3>
          <textarea
            v-model="data.catatan"
            name="catatan"
            id=""
            cols="30"
            rows="5"
            placeholder="Masukkan Catatan"
          ></textarea>
          <div class="chek" style="display: flex" v-if="data.mode === 'edit'">
            <div class="form-check">
              <input
                class="form-check-input"
                type="radio"
                name="flexRadioDefault"
                value="Succes"
                id="flexRadioDefault1"
                v-model="data.status"
              />
              <label class="form-check-label" for="flexRadioDefault1">
                Succes
              </label>
            </div>
            <div class="form-check">
              <input
                class="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault2"
                value="Pending"
                v-model="data.status"
              />
              <label class="form-check-label" for="flexRadioDefault2">
                Pending
              </label>
            </div>
            <div class="form-check">
              <input
                class="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault2"
                value="Cancelled"
                v-model="data.status"
              />
              <label class="form-check-label" for="flexRadioDefault2">
                Cancelled
              </label>
            </div>
          </div>
          <div
            class="tombol"
            style="
              display: flex;
              justify-content: space-around;
              padding-top: 10px;
            "
          >
            <button type="submit">
              {{ data.mode === "add" ? "simpan" : "edit" }}
            </button>
            <button v-if="data.mode === 'edit'" @click="initdata()">
              Batal
            </button>
          </div>
        </form>
      </div>
      <div class="right">
        <div class="top">
          <input type="text" placeholder="🔎Cari" v-model="data.search.cari" />
          <select v-model="data.search.provider">
            <option value="Telkomsel">Telkomsel</option>
            <option value="Exsis">Exsis</option>
            <option value="Smartfren">Smartfren</option>
            <option value="Xl">Xl</option>
            <option value="M3">M3</option>
          </select>
          <select v-model="data.search.status">
            <option value="Proses">Proses</option>
            <option value="Sukses">Sukses</option>
            <option value="Batal">Batal</option>
          </select>
          <button
            @click="
              data.search.cari = '';
              data.search.provider = '';
              data.search.status = '';
            "
            class="btn-secondary"
            v-if="
              data.search.cari || data.search.provider || data.search.status
            "
          >
            Reset
          </button>
        </div>
        <div class="bottom">
          <table
            class="table table-bordered border-primary"
            style="text-align: center"
          >
            <thead>
              <tr>
                <th scope="col">Date</th>
                <th scope="col">Provider</th>
                <th scope="col">Nomer Hp</th>
                <th scope="col">Nominal</th>
                <th scope="col">Status</th>
                <th scope="col">Catatan</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody v-if="filterdata.length">
              <tr v-for="(item, index) in filterdata" :key="item.id">
                <td>{{ item.tanggal }}</td>
                <td>{{ item.provider }}</td>
                <td>{{ item.no_hp }}</td>
                <td>{{ item.nominal }}</td>
                <span :class="customstatus(item.status) + ' badge'">{{
                  item.status
                }}</span>
                <td>{{ item.catatan }}</td>
                <td>
                  <button
                    @click="
                      data.mode = 'edit';
                      data.provider = item.provider;
                      data.no_hp = item.no_hp;
                      data.nominal = item.nominal;
                      data.status = item.status;
                      data.catatan = item.catatan;
                      data.selected = item;
                    "
                  >
                    🛠
                  </button>
                  <button @click="deldata(id)">⚔</button>
                </td>
              </tr>
            </tbody>
            <tbody v-else>
              <tr>
                <td style="text-align: center"><span>Data Kosong</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.wrap header h3 {
  margin-top: 10px;
  margin-left: 15px;
}
.wrap header p {
  margin-left: 15px;
}
main {
  margin-left: 15px;
}
.left {
  border: 1px solid rgb(63, 61, 61);
  max-width: 20%;
  max-height: 80vh;
  padding: 0 10px;
  border-radius: 20px;
}
.right {
  width: 80%;
  padding-left: 10px;
}
.wrap main .left h3 {
  margin-top: 10px;
  font-size: 15px;
}
.wrap main .left button {
  background-color: aqua;
  text-align: center;
  border-radius: 10px;
  font-size: 14px;
  padding: 4px 12px;
  margin-bottom: 20px;
}
.wrap main .left select,
.input {
  width: 100%;
}
.right .top {
  display: flex;
  justify-content: flex-start;
  column-gap: 1rem;
  margin-bottom: 10px;
}
.right .top input,
select {
  width: 200px;
}
</style>
