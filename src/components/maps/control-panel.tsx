import * as React from "react";
import { AutocompleteMode } from "./MapComponent";

// interface Props {
//   autocompleteModes: Array<AutocompleteMode>;
//   selectedAutocompleteMode: AutocompleteMode;
//   onAutocompleteModeChange: (autocompleteMode: AutocompleteMode) => void;
// }

// function ControlPanel({
//   autocompleteModes,
//   selectedAutocompleteMode,
//   onAutocompleteModeChange,
// }: Props) {
//   return (
//     <div className="control-panel">
//       <div className="autocomplete-mode">
//         <h4>Choose the example style: </h4>
//         <select
//           value={selectedAutocompleteMode.id}
//           onChange={(event) => {
//             const newMode = autocompleteModes.find(
//               (mode) => mode.id === event.target.value
//             );
//             if (newMode) {
//               onAutocompleteModeChange(newMode);
//             }
//           }}
//         >
//           {autocompleteModes.map(({ id, label }) => (
//             <option key={id} value={id}>
//               {label}
//             </option>
//           ))}
//         </select>
//       </div>
//     </div>
//   );
// }

// export default React.memo(ControlPanel);

interface Props {
  selectedAutocompleteMode: AutocompleteMode;
}

function ControlPanel({ selectedAutocompleteMode }: Props) {
  return <div className="control-panel"></div>;
}

export default React.memo(ControlPanel);
