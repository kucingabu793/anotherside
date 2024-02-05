const cat = document.querySelector('.cat');
const oval = document.querySelector('.oval');
const span = document.querySelector('.span')
let isClicked = false;

function catsOpen() {
  cat.style.bottom = '70%';
  span.style.visibility = 'hidden';
  setTimeout(() => {
    cat.style.bottom = '40%';
    span.style.visibility = 'visible';
  }, 3000);
}

cat.addEventListener('click', function () {
  isClicked = true;
  catsOpen();
});

oval.addEventListener('click', function () {
  isClicked = true;
  catsOpen();
});

//border
//fill
//color
//image
//message atau alert text
const inputName = document.getElementById('name');
const checkbox = document.querySelector('.checkbox');
let alertNotif = {
  success: {
    title: 'Pesanmu telah terkirim',
    image: 'asset/successalert.jpg',
    subtitle: `terimakasih {username} ! dengan kritik dan saranmu, saya akan berusaha untuk menjadi manusia yang lebih baik lagi :)`,
    btn: 'ngokeh',
    style1: {
      border: '3px solid #1A4506',
      background: '#D2E3C8'
    },
    style2: {
      color: '#1A4506',
    },
    style3: {
      color: '#1A4506'
    }
  },
  error: {
    title: 'Maaf pesanmu gagal dikirim',
    image: 'asset/larilur.jpg',
    subtitle: 'silahkan cek kembali inputbox atau melakukan reload halaman ',
    btn: 'hadeh',
    style1: {
      border: '3px solid #A94438',
      background: '#E6BAA3'
    },
    style2: {
      color: '#D04848',
    },
    style3: {
      color: '#D04848'
    }
  },
  anonim: {
    title: 'hmm... siapa anda ?',
    image: 'asset/anonymsalert.jpg',
    subtitle: 'mencurigakan wkwkwk... tapi gpp asal kamu ngga mangan gapuro deso',
    btn: 'yoiii',
    style1: {
      border: '3px solid #FFBB64',
      background: '#FFEAA7'
    },
    style2: {
      color: '#D04848',
    },
    style3: {
      color: '#D04848'
    }
  }
}
let successNotif = alertNotif.success;
let errorNotif = alertNotif.error;
let anonimNotif = alertNotif.anonim;
function displayAlert(alert, username){
  document.getElementById('alertContainer').innerHTML = 
    `<div class="alert-card" style="${Object.entries(alert.style1).map(([key, value]) => `${key}:${value}`).join(';')}">
    <div class="alert-content">
        <h4 style="${Object.entries(alert.style2).map(([key, value]) => `${key}:${value}`).join(';')}">${alert.title}</h4>
        <img src=${alert.image} alt="">
        <p style="${Object.entries(alert.style3).map(([key, value]) => `${key}:${value}`).join(';')}">${alert.subtitle.replace('{username}', username)}</p>
        <button id="closeAlert" onclick = "closeAlert()">${alert.btn}</button>
    </div>
</div>`
}

const btnSend = document.getElementById('send');
const textarea = document.getElementById('message')

//button disable
function btndisable(){
  if(inputName.value !== '' && textarea.value !== ''){
    btnSend.removeAttribute('disabled')
  } else {
    btnSend.setAttribute('disabled', 'disabled')
  }
}

//button close
function closeAlert(){
  const alertCard = document.querySelector('.alert-card');
  alertCard.style.display = 'none';
}

/*
btnSend.addEventListener('click', function(event){
  event.preventDefault();
  let username = inputName.value
  displayAlert(successNotif, username)
})*/
inputName.addEventListener('input',btndisable);
textarea.addEventListener('input', btndisable);

//button checkbox
checkbox.addEventListener('change', function() {
  if (checkbox.checked) {
    displayAlert(anonimNotif);
    
    if (inputName.value !== 'wong megeli') {
      inputName.value = 'wong megeli';
    } 
    
    inputName.setAttribute('disabled', 'disabled');
  } else {
    // Hapus alert jika checkbox tidak dicentang
    document.getElementById('alertContainer').innerHTML = '';
    
    // Mengaktifkan kembali input teks ketika checkbox tidak dicentang
    inputName.removeAttribute('disabled');
    inputName.value = ''; // Menghapus nilai input
  }
  btndisable()
});

const scriptURL = 'https://script.google.com/macros/s/AKfycbzSAKeMCI7gbrsgNt6a3X4IKlQpvq1TIKT39h-Bmw2UgZ9ZiNLm5DMYWbG1IJCUUFI23Q/exec'
    const form = document.forms['anotherside-form']
  
    form.addEventListener('submit', e => {
      e.preventDefault()
      fetch(scriptURL, { method: 'POST', body: new FormData(form)})
        .then(response => {
          let username = inputName.value
          displayAlert(successNotif, username)
          console.log('Success!', response);
          form.reset()
          btndisable()
        })
        .catch(error => {
          console.error('Error!', error.message);
          displayAlert(errorNotif)
        })
    })