const Colors = [
  // Tríade pastel: rosa, azul e verde (tons próximos e suaves)
  "#F6D6E6",
  "#F1C9DD",
  "#EABFD5",
  "#E2D3F5",
  "#D4C7F0",
  "#C7BBEA",
  "#D4F1E4",
  "#C7EBD9",
  "#B9E4CF",
  "#EDE7F8",
  "#E7F6EF",
  "#F8EEF4"
];

export default function randomColor(): string {
    return Colors[Math.floor(Math.random() * Colors.length - 1)]
}