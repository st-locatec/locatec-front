export default function Alert(
   title: string,
   desc: string,
   onNegativePress = () => {},
   onPositivePress = () => {}
) {
   const res = window.confirm(`${desc}`);
   if (res) onPositivePress();
   else onNegativePress();
}
