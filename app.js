function kelolaLahanPerkebunan(lahan, DataCuaca) {
  for (let i = 0; i < lahan.length; i++) { // aturan a 
    let baris = lahan[i];
    let totalPetak = baris.length;
    let petakSubur = 0;

    for (let j = 0; j < totalPetak; j++) { // hitung petak subur di baris
      if (baris[j] === "subur") {
        petakSubur++;
      }
    }
    if (petakSubur / totalPetak < 0.5) { // jika kurang dari 50%, semua petak di tnadai menjadi "kering"
      for (let j = 0; j < totalPetak; j++) {
        if (baris[j] === "subur") {
          baris[j] = "kering";
        }
      }
    }
  }

  let totalPetakSubur = 0; // aturan e 
  for (let i = 0; i < lahan.length; i++) {
    for (let j = 0; j < lahan[i].length; j++) {
      if (lahan[i][j] === "subur") {
        totalPetakSubur++;
      }
    }
  }

  const suhuIdeal = DataCuaca.temperature >= 20 && DataCuaca.temperature <= 30; // aturan c 
  const kelembapanIdeal = DataCuaca.humidity > 50;
  const anginIdeal = DataCuaca.windSpeed < 15;
  const cuacaCocok = suhuIdeal && kelembapanIdeal && anginIdeal;

  let totalDitanami = 0; // menentukan jumlah petak yang akan ditanami sesuai kondisi cuaca
  if (cuacaCocok) {
    totalDitanami = totalPetakSubur;
  }

  console.log(`Total petak yang subur: ${totalPetakSubur}`);
  console.log(`Total petak yang ditanami: ${totalDitanami}`);
  if (!cuacaCocok) {
    console.log("Cuaca tidak cocok untuk bercocok tanam");
  } else {
    console.log(
      "Cuaca cocok untuk bercocok tanam, sehingga tidak ada peringatan"
    );
  }
}

const lahan = [ //contoh lahan 
  ["subur", "kering", "subur", "subur"],
  ["tandus", "kering", "kering", "subur"],
  ["subur", "subur", "subur", "kering"],
  ["kering", "kering", "kering", "kering"],
];
const DataCuaca = {//contoh datacuaca
  temperature: 26,
  humidity: 59,
  windSpeed: 13,
};

kelolaLahanPerkebunan(lahan, DataCuaca);
