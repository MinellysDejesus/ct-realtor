const verses = [
  {
    text: "She is clothed with strength and dignity, and she laughs without fear of the future.",
    reference: "Proverbs 31:25"
  },
  {
    text: "For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future.",
    reference: "Jeremiah 29:11"
  },
  {
    text: "Commit to the Lord whatever you do, and He will establish your plans.",
    reference: "Proverbs 16:3"
  },
  {
    text: "Trust in the Lord with all your heart and lean not on your own understanding.",
    reference: "Proverbs 3:5"
  },
  {
    text: "Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go.",
    reference: "Joshua 1:9"
  },
  {
    text: "Let all that you do be done in love.",
    reference: "1 Corinthians 16:14"
  },
  {
    text: "With God all things are possible.",
    reference: "Matthew 19:26"
  },
  {
    text: "The Lord will fight for you; you need only to be still.",
    reference: "Exodus 14:14"
  },
  {
    text: "Those who trust in the Lord will find new strength.",
    reference: "Isaiah 40:31"
  },
  {
    text: "May He give you the desire of your heart and make all your plans succeed.",
    reference: "Psalm 20:4"
  }
];

function setDailyVerse() {
  const textEl = document.getElementById("dailyVerseText");
  const refEl = document.getElementById("dailyVerseReference");
  if (!textEl || !refEl) return;

  const today = new Date();
  const dayNumber = Math.floor(today.getTime() / (1000 * 60 * 60 * 24));
  const verse = verses[dayNumber % verses.length];

  textEl.textContent = `“${verse.text}”`;
  refEl.textContent = verse.reference;
}

function setupMobileMenu() {
  const toggle = document.getElementById("menuToggle");
  const nav = document.getElementById("mainNav");
  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => {
    nav.classList.toggle("show");
  });
}

setDailyVerse();
setupMobileMenu();


function formatCurrency(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  }).format(Math.max(0, value || 0));
}

function updatePaymentRing(principalInterest, propertyTax, hoa, total) {
  const ring = document.querySelector('.payment-ring');
  if (!ring) return;

  if (!total || total <= 0) {
    ring.style.background = 'conic-gradient(var(--line) 0deg 360deg)';
    return;
  }

  const principalDeg = (principalInterest / total) * 360;
  const taxDeg = (propertyTax / total) * 360;
  const hoaDeg = Math.max(0, 360 - principalDeg - taxDeg);

  ring.style.background = `conic-gradient(
    var(--text) 0deg ${principalDeg}deg,
    #cdb8a7 ${principalDeg}deg ${principalDeg + taxDeg}deg,
    #e7d8ca ${principalDeg + taxDeg}deg ${principalDeg + taxDeg + hoaDeg}deg
  )`;
}

function setupMortgageCalculator() {
  const homePrice = document.getElementById('homePrice');
  const downPayment = document.getElementById('downPayment');
  const loanTerm = document.getElementById('loanTerm');
  const interestRate = document.getElementById('interestRate');
  const propertyTax = document.getElementById('propertyTax');
  const hoaDues = document.getElementById('hoaDues');

  if (!homePrice || !downPayment || !loanTerm || !interestRate || !propertyTax || !hoaDues) return;

  const monthlyPayment = document.getElementById('monthlyPayment');
  const principalInterestValue = document.getElementById('principalInterestValue');
  const principalInterestPercent = document.getElementById('principalInterestPercent');
  const propertyTaxValue = document.getElementById('propertyTaxValue');
  const propertyTaxPercent = document.getElementById('propertyTaxPercent');
  const hoaValue = document.getElementById('hoaValue');
  const hoaPercent = document.getElementById('hoaPercent');
  const downPaymentPercent = document.getElementById('downPaymentPercent');

  const calculate = () => {
    const price = Number(homePrice.value) || 0;
    const dp = Math.min(Number(downPayment.value) || 0, price);
    const years = Number(loanTerm.value) || 30;
    const rate = (Number(interestRate.value) || 0) / 100 / 12;
    const taxMonthly = Number(propertyTax.value) || 0;
    const hoaMonthly = Number(hoaDues.value) || 0;
    const principal = Math.max(0, price - dp);
    const payments = years * 12;

    let pi = 0;
    if (principal > 0 && payments > 0) {
      if (rate === 0) {
        pi = principal / payments;
      } else {
        pi = principal * (rate * Math.pow(1 + rate, payments)) / (Math.pow(1 + rate, payments) - 1);
      }
    }

    const total = pi + taxMonthly + hoaMonthly;
    const pct = (val) => total > 0 ? `${Math.round((val / total) * 100)}%` : '0%';
    const dpPct = price > 0 ? `${Math.round((dp / price) * 100)}%` : '0%';

    monthlyPayment.textContent = formatCurrency(total);
    principalInterestValue.textContent = formatCurrency(pi);
    propertyTaxValue.textContent = formatCurrency(taxMonthly);
    hoaValue.textContent = formatCurrency(hoaMonthly);
    principalInterestPercent.textContent = pct(pi);
    propertyTaxPercent.textContent = pct(taxMonthly);
    hoaPercent.textContent = pct(hoaMonthly);
    downPaymentPercent.textContent = dpPct;
    updatePaymentRing(pi, taxMonthly, hoaMonthly, total);
  };

  [homePrice, downPayment, loanTerm, interestRate, propertyTax, hoaDues].forEach((input) => {
    input.addEventListener('input', calculate);
    input.addEventListener('change', calculate);
  });

  calculate();
}

setupMortgageCalculator();
