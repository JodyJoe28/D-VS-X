const dStartWinsInput = document.getElementById("dStartWins");
const xStartWinsInput = document.getElementById("xStartWins");
const saveStartingRecordBtn = document.getElementById("saveStartingRecordBtn");
const startingRecordMessage = document.getElementById("startingRecordMessage");

let startingRecord = {
  d_start_wins: 0,
  x_start_wins: 0
};

async function loadStartingRecord() {
  const { data, error } = await supabase
    .from("settings")
    .select("*")
    .eq("id", "main")
    .single();

  if (error) {
    console.log(error);
    return;
  }

  startingRecord = data;

  dStartWinsInput.value = data.d_start_wins;
  xStartWinsInput.value = data.x_start_wins;

  updatePage();
}

async function saveStartingRecord() {
  const dStartWins = Number(dStartWinsInput.value);
  const xStartWins = Number(xStartWinsInput.value);

  const { error } = await supabase
    .from("settings")
    .update({
      d_start_wins: dStartWins,
      x_start_wins: xStartWins,
      updated_at: new Date()
    })
    .eq("id", "main");

  if (error) {
    startingRecordMessage.textContent = "Could not save starting record.";
    console.log(error);
    return;
  }

  startingRecordMessage.textContent = "Starting record saved.";
  loadStartingRecord();
}

saveStartingRecordBtn.addEventListener("click", saveStartingRecord);