<script setup>
import { computed, reactive, watchEffect } from "vue";
import * as Yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
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
const tambah = (values, { resetForm }) => {
  if (data.mode === "add") {
    data.data.unshift({
      id: Math.random(),
      tanggal: new Date().toISOString(),
      provider: values.provider,
      no_hp: values.no_hp,
      nominal: values.nominal,
      status: "Pending",
      catatan: data.catatan || "-",
    });
    resetForm();
  } else {
    // Carikan index dari todo.data yang akan diedit
    const i = data.data.findIndex((o) => o.id === data.selected.id);
    // Ubah data pada index tersebut
    data.data[i] = {
      tanggal: new Date().toISOString(),
      provider: values.provider,
      no_hp: values.no_hp,
      nominal: values.nominal,
      catatan: values.catatan || "-",
      status: data.status,
    };
    // Reset
    resetForm();
    initdata();
  }
};
const menampilkandata = computed(() => {
  return data.data;
});
const schema = Yup.object().shape({
  provider: Yup.string()
    .required("provider wajib diisi")
    .typeError("provider wajib di isi"),
  no_hp: Yup.string()
    .min(10, "NO Hp minimal 10 karakter")
    .max(13, "NO Hp maxsimal 13 karakter")
    .matches(/^[0-9]+$/, "NO Hp harus berupa angka")
    .required("NO Hp wajib di isi")
    .typeError("NO Hp harus berupa angka"),
  nominal: Yup.number("Nominal harus berupa angka")
    .required("Nominal wajib di isi")
    .min(10000, "minimal pembelian 10.000")
    .typeError("nominal harus berupa angka"),
  textarea: Yup.string().max(100, "Maxsimal 100 kata"),
});
const initdata = () => {
  // data.provider = null;
  // data.no_hp = null;
  // data.nominal = null;
  // data.catatan = null;
  // data.status = null;
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
      if (!item.no_hp.match(data.search.cari)) {
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
        <Form @submit="tambah" :validation-schema="schema" v-slot="{ errors }">
          <Field
            as="select"
            v-model="data.provider"
            :class="{ 'is-invalid': errors.provider }"
            name="provider"
            id="provider"
          >
            <option value="">Pilih Provider</option>
            <option value="Telkomsel">Telkomsel</option>
            <option value="Exsis">Exsis</option>
            <option value="Smartfren">Smartfren</option>
            <option value="Xl">Xl</option>
            <option value="M3">M3</option>
          </Field>
          <ErrorMessage name="provider" class="invalid-feedback"></ErrorMessage>
          <h3>NO.hp</h3>
          <div class="input-group mb-3">
            <span class="input-group-text">+62</span>
            <Field
              type="text"
              v-model="data.no_hp"
              id="no_hp"
              name="no_hp"
              :class="{ 'is-invalid': errors.no_hp }"
              class="form-control"
              aria-label="Dollar amount (with dot and two decimal places)"
            />
            <ErrorMessage name="no_hp" class="invalid-feedback"></ErrorMessage>
          </div>
          <h3>Nominal Pulsa</h3>
          <div class="input-group mb-3">
            <span class="input-group-text">Rp</span>
            <Field
              type="number"
              v-model="data.nominal"
              :class="{ 'is-invalid': errors.nominal }"
              name="nominal"
              id="nominal"
              class="form-control"
              aria-label="Dollar amount (with dot and two decimal places)"
            />
            <ErrorMessage
              name="nominal"
              class="invalid-feedback"
            ></ErrorMessage>
          </div>
          <h3>Catatan</h3>
          <Field
            v-model="data.catatan"
            as="textarea"
            name="catatan"
            id="catatan"
            cols="30"
            rows="5"
            :class="{ 'is-invalid': errors.nominal }"
            placeholder="Masukkan Catatan"
          ></Field>
          <ErrorMessage name="catatan" class="invalid-feedback"></ErrorMessage>
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
          <div class="tombol">
            <button type="submit">
              {{ data.mode === "add" ? "simpan" : "edit" }}
            </button>
            <button v-if="data.mode === 'edit'" @click="initdata()">
              Batal
            </button>
          </div>
        </Form>
      </div>
      <div class="right">
        <div class="top">
          <input type="text" placeholder="🔎Cari" v-model="data.search.cari" />
          <select v-model="data.search.provider">
            <option value="">Pilih Provider</option>
            <option value="Telkomsel">Telkomsel</option>
            <option value="Exsis">Exsis</option>
            <option value="Smartfren">Smartfren</option>
            <option value="Xl">Xl</option>
            <option value="M3">M3</option>
          </select>
          <select v-model="data.search.status">
            <option value="">Pilih Status</option>
            <option value="Pending">pending</option>
            <option value="Succes">Succes</option>
            <option value="Cancelled">Cancelled</option>
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
  height: auto;
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
