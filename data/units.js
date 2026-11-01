// Synthetic demonstration data. These are not actual project sales records.
export const units = [
  { id: 'B3.1', category: 'byt', type: '3-izbový byt', floor: '3. NP', interior: 68.4, balcony: 6.2, terrace: null, storage: null, status: 'Voľné', image: 'living' },
  { id: 'B3.2', category: 'byt', type: '2-izbový byt', floor: '3. NP', interior: 52.7, balcony: 4.8, terrace: null, storage: null, status: 'Rezervované', image: 'living' },
  { id: 'B4.1', category: 'byt', type: '3-izbový byt', floor: '4. NP', interior: 74.1, balcony: 7.0, terrace: null, storage: null, status: 'Voľné', image: 'living' },
  { id: 'B4.2', category: 'byt', type: '2-izbový byt', floor: '4. NP', interior: 55.3, balcony: 5.1, terrace: null, storage: null, status: 'Voľné', image: 'living' },
  { id: 'A2.1', category: 'administrativa', type: 'Administratívny priestor', floor: '2. NP', interior: 48.6, balcony: null, terrace: null, storage: null, status: 'Voľné', image: 'office' },
  { id: 'A2.2', category: 'administrativa', type: 'Administratívny priestor', floor: '2. NP', interior: 62.8, balcony: null, terrace: null, storage: null, status: 'Rezervované', image: 'office' },
  { id: 'O1.1', category: 'obchod', type: 'Obchod / služby', floor: 'Prízemie', interior: 91.5, balcony: null, terrace: null, storage: null, status: 'Voľné', image: 'exterior' },
  { id: 'P5.1', category: 'apartman', type: 'Podkrovný apartmán', floor: 'Podkrovie', interior: 84.2, balcony: null, terrace: 12.0, storage: null, status: 'Voľné', image: 'living' },
];

export const images = {
  exterior: { src: './assets/exterior.webp', alt: 'Fiktívna podoba mestského domu s obchodným prízemím; ilustrácia.' },
  living: { src: './assets/living.webp', alt: 'Fiktívny interiér bytu s pohovkou a dubovým nábytkom; ilustrácia.' },
  office: { src: './assets/office.webp', alt: 'Fiktívny administratívny priestor s pracovnými stolmi; ilustrácia.' },
};

const number = new Intl.NumberFormat('sk-SK', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
export const area = value => value == null ? '—' : `${number.format(value)} m²`;
export const exterior = unit => unit.balcony != null ? `Balkón ${area(unit.balcony)}` : unit.terrace != null ? `Terasa ${area(unit.terrace)}` : '—';
