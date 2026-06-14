const LS_KEY = 'ncq_contact_info';
const SS_KEY = 'ncq_form_draft';

const fields = ['nombre', 'apellidos', 'correo', 'telefono', 'producto'];

function getFieldValues() {
    let data = {};
    fields.forEach(id => {
        data[id] = document.getElementById(id).value.trim();
    });
    return data;
}

function fillFields(data, ids = fields) {
    ids.forEach(id => {
        if (!data[id]) return;
        document.getElementById(id).value = data[id];
    });
}

window.addEventListener('DOMContentLoaded', () => {
    const saved = JSON.parse(localStorage.getItem(LS_KEY)  || 'null');
    const draft = JSON.parse(sessionStorage.getItem(SS_KEY) || 'null');
    const banner = document.getElementById('returningBanner');
    const msg = document.getElementById('returningMsg');

    if (draft) {
        fillFields(draft);
    }

    if (saved && !draft) {
        fillFields(saved, ['nombre', 'apellidos', 'correo', 'producto']);
        let nombre = saved.nombre ? `, ${saved.nombre}` : '';
        msg.textContent = `¡Bienvenido de nuevo${nombre}! Completamos algunos campos con su información anterior.`;
        banner.classList.add('visible');
    }

    fields.forEach(id => {
        let el  = document.getElementById(id);
        let evt = (el.tagName === 'SELECT') ? 'change' : 'input';
        el.addEventListener(evt, saveDraft);
    });
});

function saveDraft() {
    sessionStorage.setItem(SS_KEY, JSON.stringify(getFieldValues()));
}

document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();

    let data = getFieldValues();

    localStorage.setItem(LS_KEY, JSON.stringify(data));

    sessionStorage.removeItem(SS_KEY);

    const productoLabel = { qupos: 'QuPOS', factun: 'Factun', ubitec: 'Ubitec' }[data.producto] || data.producto;
    document.getElementById('successDetail').textContent =
        `Gracias${data.nombre ? ', ' + data.nombre : ''}. Un asesor de ${productoLabel} se comunicará con usted pronto.`;

    document.getElementById('contactForm').style.display = 'none';
    document.getElementById('returningBanner').classList.remove('visible');
    document.getElementById('successMsg').classList.add('visible');
});

document.getElementById('btnBack').addEventListener('click', () => {
    document.getElementById('contactForm').reset();
    document.getElementById('contactForm').style.display = 'block';
    document.getElementById('successMsg').classList.remove('visible');
    sessionStorage.removeItem(SS_KEY);
});