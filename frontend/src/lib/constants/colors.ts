const Colors: string[] = [
	"#EAF4FF",
	"#D6E9FF",
	"#BDD9FF",
	"#A3C9FF",
	"#89B8F5"
];

const colorsSecundary: string[] = [
  "#DBEAFE",
	"#FEE2E2",
	"#DCFCE7",
	"#FEF3C7",
	"#EDE9FE"
]


export default function randomColor(type: '1' | '2'): string {
  if (type == '1') {
    return Colors[Math.floor(Math.random() * Colors.length )]
  }
  return colorsSecundary[Math.floor(Math.random() * colorsSecundary.length - 1)]
}