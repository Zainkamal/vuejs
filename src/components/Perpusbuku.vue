<script setup>
import { computed, reactive, watchEffect } from "vue";
import * as Yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
const databuku = reactive({
  data: JSON.parse(localStorage.getItem("buku") || "[]"),
  selected: null,
  namabuku: null,
  Author: null,
  Katagori: [],
  status: "",
  mode: "add",
  cari: {
    nama: "",
    Katagori: "",
    status: "",
  },
});
// Menambah data
const add = (values, { resetForm }) => {
  if (databuku.mode === "add") {
    databuku.data.unshift({
      id: Math.random(),
      tanggal: new Date().toISOString(),
      namabuku: values.namabuku,
      Author: values.Author,
      Katagori: databuku.Katagori,
      status: "Tersedia",
    });
    resetForm();
    reset();
  } else {
    const i = databuku.data.findIndex((o) => o.id === databuku.selected.id);
    databuku.data[i] = {
      ...databuku.selected,
      tanggal: databuku.tanggal,
      namabuku: values.namabuku,
      Author: values.Author,
      Katagori: databuku.Katagori,
      status: databuku.status,
    };
    resetForm();
    reset();
  }
};
// const tampilkandata = computed(() => {
//   return databuku.data;
// });
const schema = Yup.object().shape({
  namabuku: Yup.string()
    .required("Nama buku wajib di isi")
    .typeError("Nama buku wajib di isi"),
  Author: Yup.string()
    .required("Author wajib di isi")
    .typeError("Author wajib di isi"),
});
const filter = computed(() => {
  return databuku.data.filter((item) => {
    if (databuku.cari.Katagori) {
      if (!item.Katagori.includes(databuku.cari.Katagori)) {
        return false;
      }
    }
    if (databuku.cari.status) {
      if (item.status !== databuku.cari.status) {
        return false;
      }
    }
    if (databuku.cari.nama) {
      if (!item.namabuku.match(databuku.cari.nama)) {
        return false;
      }
    }
    return true;
  });
});
function del(index) {
  // alert confirm
  if (confirm("Are you sure?")) {
    databuku.data.splice(index, 1);
  }
}
const reset = () => {
  databuku.namabuku = null;
  databuku.Author = null;
  databuku.Katagori = [];
  databuku.status = null;
  databuku.mode = "add";
};
const tatus = (status) => {
  switch (status) {
    case "Dipinjam":
      return "text-bg-success";
    case "Tersedia":
      return "text-bg-warning";
    default:
      return "text-bg-dark";
  }
};
watchEffect(() => {
  localStorage.setItem("buku", JSON.stringify(databuku.data));
});
</script>

<template>
  <header>
    <h3>Milfin Zainul Asiqin</h3>
    <h5>UNUJA TEKNIK SLEBEWW</h5>
  </header>
  <main>
    <div class="left">
      <div class="form">
        <Form @submit="add" :validation-schema="schema" v-slot="{ errors }">
          <label for="formGroupExampleInput" class="form-label"
            >Nama Buku :</label
          >
          <Field
            type="text"
            v-model="databuku.namabuku"
            :class="{ 'is-invalid': errors.namabuku }"
            name="namabuku"
            id="namabuku"
            class="form-control"
            placeholder="input Nama Buku"
          >
          </Field>
          <ErrorMessage name="namabuku" class="invalid-feedback"></ErrorMessage>
          <div class="mb-3">
            <label for="formGroupExampleInput2" class="form-label"
              >Author :</label
            >
            <Field
              type="text"
              v-model="databuku.Author"
              class="form-control"
              id="Author"
              name="Author"
              :class="{ 'is-invalid': errors.Author }"
              placeholder="input Author"
            >
            </Field>
            <ErrorMessage name="Author" class="invalid-feedback"></ErrorMessage>
          </div>
          <label for="">Katagori Buku:</label><br />
          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="checkbox"
              id="inlineCheckbox1"
              value="Novel"
              v-model="databuku.Katagori"
            />
            <label class="form-check-label" for="inlineCheckbox1">Novel</label>
          </div>
          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="checkbox"
              id="inlineCheckbox2"
              value="Majalah"
              v-model="databuku.Katagori"
            />
            <label class="form-check-label" for="inlineCheckbox2"
              >Majalah</label
            >
          </div>
          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="checkbox"
              id="inlineCheckbox2"
              value="Kamus"
              v-model="databuku.Katagori"
            />
            <label class="form-check-label" for="inlineCheckbox2">Kamus</label>
          </div>
          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="checkbox"
              id="inlineCheckbox2"
              value="Komik"
              v-model="databuku.Katagori"
            />
            <label class="form-check-label" for="inlineCheckbox2">Komik</label>
          </div>
          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="checkbox"
              id="inlineCheckbox2"
              value="Manga"
              v-model="databuku.Katagori"
            />
            <label class="form-check-label" for="inlineCheckbox2">Manga</label>
          </div>
          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="checkbox"
              id="inlineCheckbox2"
              value="Ensiklopedia"
              v-model="databuku.Katagori"
            />
            <label class="form-check-label" for="inlineCheckbox2"
              >Ensiklopedia</label
            >
          </div>
          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="checkbox"
              id="inlineCheckbox2"
              value="Biografi"
              v-model="databuku.Katagori"
            />
            <label class="form-check-label" for="inlineCheckbox2"
              >Biografi</label
            >
          </div>
          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="checkbox"
              id="inlineCheckbox2"
              value="Naskah"
              v-model="databuku.Katagori"
            />
            <label class="form-check-label" for="inlineCheckbox2">Naskah</label>
          </div>
          <br />
          <table v-if="databuku.mode === 'edit'">
            Status buku:
          </table>
          <div
            class="status"
            style="display: flex"
            v-if="databuku.mode === 'edit'"
          >
            <div class="form-check">
              <input
                class="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault1"
                value="Dipinjam"
                v-model="databuku.status"
              />
              <label class="form-check-label" for="flexRadioDefault1">
                Dipinjam
              </label>
            </div>
            <div class="form-check">
              <input
                class="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault2"
                value="Tersedia"
                v-model="databuku.status"
              />
              <label class="form-check-label" for="flexRadioDefault2">
                Tersedia
              </label>
            </div>
          </div>
          <button type="submit">
            {{ databuku.mode === "add" ? "simpan" : "edit" }}
          </button>
          <button v-if="databuku.mode === 'edit'" @click="initdata()">
            Batal
          </button>
        </Form>
      </div>
    </div>
    <div class="right">
      <div class="top">
        <input
          type="text"
          placeholder="🔎cari..."
          v-model="databuku.cari.nama"
        />
        <select
          class="form-select"
          aria-label="Default select example"
          v-model="databuku.cari.Katagori"
        >
          <option value="">Katagori Buku</option>
          <option value="Novel">Novel</option>
          <option value="Majalah">Majalah</option>
          <option value="Kamus">Kamus</option>
          <option value="Komik">Komik</option>
          <option value="Manga">Manga</option>
          <option value="Ensiklopedia">Ensiklopedia</option>
          <option value="Biografi">Biografi</option>
          <option value="Naskah">Naskah</option>
        </select>
        <select
          class="form-select"
          aria-label="Default select example"
          v-model="databuku.cari.status"
        >
          <option value="">Status Buku</option>
          <option value="Dipinjam">Dipinjam</option>
          <option value="Tersedia">Tersedia</option>
        </select>
        <button
          @click="
            databuku.cari.nama = '';
            databuku.cari.Katagori = '';
            databuku.cari.status = '';
          "
          class="btn-secondary"
          v-if="
            databuku.cari.nama || databuku.cari.Katagori || databuku.cari.status
          "
        >
          Reset
        </button>
      </div>
      <div class="bottom">
        <table class="table">
          <thead class="table-dark">
            <tr>
              <th scope="col">Tanggal</th>
              <th scope="col">Nama Buku</th>
              <th scope="col">Author</th>
              <th scope="col">Katagori</th>
              <th scope="col">Status</th>
              <th scope="col">Activet</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in filter" :key="item.id">
              <th scope="row">{{ item.tanggal }}</th>
              <td>{{ item.namabuku }}</td>
              <td>{{ item.Author }}</td>
              <td>
                <span v-for="(data, idx) in item.Katagori" :key="idx">
                  {{ data }}
                  <span v-if="idx + 1 < item.Katagori.length">,</span>
                </span>
              </td>
              <td>
                <span :class="tatus(item.status) + ' badge'">{{
                  item.status
                }}</span>
              </td>
              <td>
                <button
                  @click="
                    databuku.mode = 'edit';
                    databuku.tanggal = item.tanggal;
                    databuku.selected = item;
                    databuku.namabuku = item.namabuku;
                    databuku.Author = item.Author;
                    databuku.Katagori = item.Katagori;
                    databuku.status = item.status;
                  "
                >
                  🛠
                </button>
                <button @click="del(index)">⚔</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </main>
</template>

<style scoped>
header {
  background-color: rgb(107, 109, 108);
  width: 100%;
  height: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 7px 20px;
  color: white;
}
main {
  width: 100%;
  display: flex;
}
main .left {
  max-width: 25%;
  border: 1px solid black;
  margin-top: 10px;
}
main .left .form {
  margin: 20px 20px;
  height: auto;
  border: 1px solid black;
  box-shadow: 2px 3px 7px black;
}
main .left .form form {
  padding: 10px 10px;
}
main .right {
  width: 75%;
  border: 1px solid black;
  margin-top: 10px;
}
main .right .top {
  display: flex;
  justify-self: flex-start;
  margin-bottom: 10px;
}
</style>
