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
