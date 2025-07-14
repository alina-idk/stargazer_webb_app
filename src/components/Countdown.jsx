// import React, { useState, useEffect } from "react";

// export function Countdown() {
//   const [daysLeft, setDaysLeft] = useState(null);

//   useEffect(() => {
//     const targetDate = new Date("2025-09-07"); // data eclipsei 🌑
//     const today = new Date();

//     // Diferența în milisecunde
//     const diff = targetDate - today;

//     // Transformăm în zile
//     const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
//     setDaysLeft(days);
//   }, []);

//   return (
//     <div className="countdown-card">
//       <h2>🌘 Numărătoare inversă până la următoarea eclipsă:</h2>
//       {daysLeft !== null ? (
//         <p>{daysLeft} zile rămase până la magia cerului!</p>
//       ) : (
//         <p>Calculăm stelele...</p>
//       )}
//     </div>
//   );
// }





// import { Countdown } from "../components/Countdown";

// export function Home() {
//   return (
//     <div>
//       <h1>✨ Bine ai venit, exploratorule! ✨</h1>
//       <Countdown />
//     </div>
//   );
// }
