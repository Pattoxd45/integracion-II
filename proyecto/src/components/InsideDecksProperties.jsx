import React, { useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels,
);

const InsideDecksProperties = ({ cards }) => {
  const [detailedCards, setDetailedCards] = useState([]);

  // Obtener datos detallados de cada carta desde Scryfall
  useEffect(() => {
    const fetchCardDetails = async () => {
      const fetchedCards = [];
      for (const card of cards) {
        try {
          const response = await fetch(
            `https://api.scryfall.com/cards/${card.id}`,
          );
          if (response.ok) {
            const cardData = await response.json();
            fetchedCards.push(cardData);
          } else {
            console.error(
              `Error al obtener detalles de la carta con ID: ${card.id}`,
            );
          }
        } catch (error) {
          console.error("Error en la petición a Scryfall:", error);
        }
      }
      setDetailedCards(fetchedCards);
    };

    fetchCardDetails();
  }, [cards]);

  // Mapa de colores para tipos de maná
  const colorMap = {
    B: "#CBC2BF", // Black
    U: "#AAE0FA", // Blue
    W: "#FFFBD5", // White
    R: "#F9AA8F", // Red
    G: "#9BD3AE", // Green
    C: "#bcbcbc", // Colorless
  };

  // Colores personalizados para los tipos/subtipos y rarezas
  const typeColorMap = [
    "#9BD3AE",
    "#AAE0FA",
    "#FFFBD5",
    "#F9AA8F",
    "#CBC2BF",
    "#bcbcbc",
    "#87CEFA",
    "#FFD700",
    "#8A2BE2",
    "#FF69B4",
  ];

  const rarityColorMap = {
    common: "#9BD3AE", // Green
    uncommon: "#AAE0FA", // Blue
    rare: "#F9AA8F", // Red
    mythic: "#FFD700", // Gold
    special: "#8A2BE2", // Purple
    bonus: "#CBC2BF", // Gray
    masterpiece: "#FF69B4", // Pink
  };

  // Inicializar datos de gráficos
  const manaValuesByColor = {
    B: Array(8).fill(0),
    U: Array(8).fill(0),
    W: Array(8).fill(0),
    R: Array(8).fill(0),
    G: Array(8).fill(0),
    C: Array(8).fill(0),
  };

  const totalManaCosts = {
    B: 0,
    U: 0,
    W: 0,
    R: 0,
    G: 0,
    C: 0,
  };

  const cardTypesCount = {};
  const rarityCount = {};

  // Procesar las cartas
  detailedCards.forEach((card) => {
    const cmc = Math.min(card.cmc || 0, 7); // Agrupar 7+
    const colors = card.colors.length > 0 ? card.colors : ["C"]; // Usar "C" si no tiene colores

    // Procesar valores de maná
    colors.forEach((color) => {
      if (manaValuesByColor[color]) {
        manaValuesByColor[color][cmc]++;
        totalManaCosts[color]++;
      }
    });

    // Extraer tipo y subtipo desde `type_line`
    const typeLine = card.type_line || "Other";
    const [type, ...subtypes] = typeLine.split("—").map((s) => s.trim());
    const cardType = subtypes.length > 0 ? subtypes.join(" ") : type;

    if (cardTypesCount[cardType]) {
      cardTypesCount[cardType]++;
    } else {
      cardTypesCount[cardType] = 1;
    }

    // Procesar rarezas
    const rarity = card.rarity || "unknown";
    if (rarityCount[rarity]) {
      rarityCount[rarity]++;
    } else {
      rarityCount[rarity] = 1;
    }
  });

  // Datos para Mana Costs by Color
  const filteredManaCosts = Object.entries(totalManaCosts).filter(
    ([_, value]) => value > 0,
  );
  const totalMana = filteredManaCosts.reduce(
    (sum, [_, value]) => sum + value,
    0,
  );
  const pieDataManaCosts = {
    labels: filteredManaCosts.map(([color]) => color),
    datasets: [
      {
        data: filteredManaCosts.map(([_, value]) =>
          Math.round((value / totalMana) * 100),
        ),
        backgroundColor: filteredManaCosts.map(([color]) => colorMap[color]),
        borderColor: "#12181E",
        borderWidth: 2,
      },
    ],
  };

  const pieDataCardTypes = {
    labels: Object.keys(cardTypesCount),
    datasets: [
      {
        data: Object.values(cardTypesCount),
        backgroundColor: Object.keys(cardTypesCount).map(
          (_, index) => typeColorMap[index % typeColorMap.length],
        ),
        borderColor: "#12181E",
        borderWidth: 2,
      },
    ],
  };

  const pieDataRarities = {
    labels: Object.keys(rarityCount),
    datasets: [
      {
        data: Object.values(rarityCount),
        backgroundColor: Object.keys(rarityCount).map(
          (rarity) => rarityColorMap[rarity] || "#888888", // Default color for unknown rarities
        ),
        borderColor: "#12181E",
        borderWidth: 2,
      },
    ],
  };

  // Datos para Mana Value Distribution
  const barData = {
    labels: ["0", "1", "2", "3", "4", "5", "6", "7+"],
    datasets: Object.entries(manaValuesByColor).map(([color, values]) => ({
      label: color,
      data: values,
      backgroundColor: colorMap[color],
      barThickness: 40,
    })),
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        labels: {
          color: "#FFFFFF",
        },
      },
      datalabels: {
        color: "#FFFFFF",
        anchor: "end",
        align: "start",
        offset: 10,
        font: { size: 12 },
        display: (context) => context.dataset.data[context.dataIndex] > 0,
        formatter: (value) => value,
      },
    },
    scales: {
      x: {
        stacked: true,
        ticks: {
          color: "#FFFFFF",
          padding: 10,
        },
        grid: { display: false },
      },
      y: {
        stacked: true,
        ticks: {
          display: false,
        },
        grid: { display: false },
      },
    },
    layout: {
      padding: {
        top: 20,
        bottom: 10,
      },
    },
  };

  const pieOptions1 = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          color: "#FFFFFF",
        },
      },
      title: {
        display: true,
        text: "Costos de Mana",
        color: "#FFFFFF",
        font: {
          size: 14,
        },
        padding: {
          top: 5,
          bottom: 5,
        },
      },
    },
    layout: {
      padding: {
        top: 10,
        bottom: 10,
        left: 20,
        right: 20,
      },
    },
    maintainAspectRatio: false,
  };

  const pieOptions2 = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          color: "#FFFFFF",
        },
      },
      title: {
        display: true,
        text: "Tipo/Subtipo de Cartas",
        color: "#FFFFFF",
        font: {
          size: 14,
        },
        padding: {
          top: 5,
          bottom: 5,
        },
      },
    },
    layout: {
      padding: {
        top: 10,
        bottom: 10,
        left: 20,
        right: 20,
      },
    },
    maintainAspectRatio: false,
  };

  const pieOptions3 = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          color: "#FFFFFF",
        },
      },
      title: {
        display: true,
        text: "Rareza de Cartas",
        color: "#FFFFFF",
        font: {
          size: 14,
        },
        padding: {
          top: 5,
          bottom: 5,
        },
      },
    },
    layout: {
      padding: {
        top: 10,
        bottom: 10,
        left: 20,
        right: 20,
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div className="overflow-y-auto h-[76vh] space-y-4 rounded-md">
      <div className="grid grid-cols-2 gap-[8px] w-full">
        {/* Gráfico de barras apiladas */}
        <div className="w-full h-[450px] bg-[#12181E] rounded-md p-4 flex flex-col justify-center items-center">
          <h2 className="text-white text-xl mb-4">Valor de Mana</h2>
          <Bar data={barData} options={barOptions} />
        </div>

        {/* Gráfico de pastel de costos totales */}
        <div className="w-full h-[450px] bg-[#12181E] rounded-md p-4 flex flex-col justify-center items-center">
          <Pie data={pieDataManaCosts} options={pieOptions1} />
        </div>

        {/* Gráfico de pastel para tipos de cartas */}
        <div className="w-full h-[450px] bg-[#12181E] rounded-md p-4 flex flex-col justify-center items-center">
          <Pie data={pieDataCardTypes} options={pieOptions2} />
        </div>

        {/* Gráfico de pastel para rarezas */}
        <div className="w-full h-[450px] bg-[#12181E] rounded-md p-4 flex flex-col justify-center items-center">
          <Pie data={pieDataRarities} options={pieOptions3} />
        </div>
      </div>
    </div>
  );
};

export default InsideDecksProperties;
