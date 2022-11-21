<script setup>

</script>
<template>
    <header style="padding:15px 0">
        <img src="../assets/logo.jpg" alt="" style="width:100px; height:100px;margin-right: 20px;" />
        <div class="nama">
            <h3 style="color:white">MILFIN ZAINUL ASIQIN</h3>
            <h4 style="color:white">Front and developer</h4>
            <div class="tombol">
                <button>Download cv</button>
                <button style="background-color: rgb(87, 248, 135); color:">
                    read me
                </button>
            </div>
        </div>
    </header>
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
</template>
<style scoped>
.container {
    width: 100%;
    height: auto;
    border: 1px solid black;
}

header {
    width: 100%;
    height: auto;
    display: flex;
    background-color: blue;
    justify-content: center;
    flex-direction: row;
}

.container header img {
    width: 100px;
    height: 130px;
    margin: 30px 40px;
    border: 1px solid white;
}

.container header .nama {
    color: white;
    margin: 20px 20px;
}

.container header .nama h3 {
    font-size: 35px;
    padding-bottom: 15px;
}

.container header .nama .tombol {
    margin-top: 10px;
}

.container header .nama .tombol button {
    padding: 7px 13px;
    border-radius: 15px;
    border: 1px solid white;
}

main {
    width: 100%;
}

main h3 {
    margin: 10px 15px;
}

main .about {
    display: flex;
    flex-direction: row;
    border-bottom: 1px solid black;
    padding-bottom: 10px;
}

main .about .me,
.kumpul {
    max-width: 50%;
    margin-left: 15px;
    margin-right: 30px;
}

.kotak {
    display: flex;
    flex-direction: row;
}

.kotak form {
    margin-left: 20px;
}

.kotak form input,
textarea {
    margin: 8px 5px;
}

.kotak .alm {
    margin-left: 10px;
}

button {
    padding: 7px 13px;
}

.kotak .alm h4,
p {
    margin-bottom: 10px;
}
</style>