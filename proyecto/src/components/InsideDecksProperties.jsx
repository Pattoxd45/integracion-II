import React from "react";
import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend } from 'chart.js'; // npm install react-chartjs-2 chart.js
import ChartDataLabels from 'chartjs-plugin-datalabels'; // npm install chartjs-plugin-datalabels

// Registrar los componentes de Chart.js y el plugin de etiquetas
ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend, ChartDataLabels);

const InsideDecksProperties = () => {
  // Datos y configuraciones del gráfico de barras
  const barData = {
    labels: ["0", "1", "2", "3", "4", "5", "6", "7+"], // Etiquetas en el eje X
    datasets: [
      {
        label: "Valores",
        data: [null, 5, 9, 3, 7, null, null, null], 
        backgroundColor: ["#FFFBD5", "#AAE0FA", "#CBC2BF", "#F9AA8F", "#9BD3AE"], // Colores personalizados
        barThickness: 40,
        categoryPercentage: 0.6,
        barPercentage: 1.0,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Mana Value",
        color: "#FFFFFF",
        font: {
          size: 18,
        },
        padding: {
          top: 10,
          bottom: 10,
        },
      },
      tooltip: {
        enabled: false,
      },
      datalabels: {
        color: "#FFFFFF",
        anchor: "end",
        align: "end",
        offset: -5,
        font: {
          size: 14,
        },
        display: function(context) {
          return context.dataset.data[context.dataIndex] !== null;
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#FFFFFF",
        },
        grid: {
          display: false,
        },
        border: {
          display: true,
          color: "rgba(255,255,255,0.1)",
          width: 1,
        },
      },
      y: {
        display: false, // Ocultar eje Y
        grid: {
          display: false,
        },
      },
    },
  };

  // Datos y configuraciones del gráfico de pie para "Mana Costs"
  const pieDataCosts = {
    labels: ["Green", "Blue", "White"],
    datasets: [
      {
        label: "Distribución de Colores",
        data: [45, 30, 25], // Valores aleatorios para las secciones
        backgroundColor: ["#9BD3AE", "#AAE0FA", "#FFFBD5"], // Colores: verde, azul y blanco
        borderColor: "#12181E", // Color del borde (igual que el fondo)
        borderWidth: 2,
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'bottom', // Posicionar la leyenda debajo del gráfico
        labels: {
          color: "#FFFFFF", // Color del texto de la leyenda
        },
      },
      tooltip: {
        enabled: false, // Deshabilitar el tooltip
      },
    },
  };

  // Datos y configuraciones del gráfico de pie para "Mana Production"
  const pieDataProduction = {
    labels: ["Green", "Blue", "White", "Colorless"],
    datasets: [
      {
        label: "Mana Production",
        data: [40, 25, 20, 15], // Valores aleatorios para las secciones
        backgroundColor: ["#9BD3AE", "#AAE0FA", "#FFFBD5", "#bcbcbc"], // Colores: verde, azul, blanco, incoloro
        borderColor: "#12181E",
        borderWidth: 2,
      },
    ],
  };

  // Datos y configuraciones del gráfico de pie para "Card Types"
  const pieDataTypes = {
    labels: ["Creatures", "Enchantments", "Sorceries", "Planeswalkers", "Lands", "Instants", "Artifacts"],
    datasets: [
      {
        label: "Tipos de Cartas",
        data: [40, 10, 10, 5, 20, 10, 5], // Valores aleatorios para las secciones
        backgroundColor: [
          "#F9AA8F",  // Red para Creatures
          "#FFFBD5",  // White para Enchantments
          "#9BD3AE",  // Green para Sorceries
          "#e0e0e0",  // White (darker) para Planeswalkers
          "#444444",  // #444 para Lands
          "#AAE0FA",  // Blue para Instants
          "#bcbcbc"   // Colorless para Artifacts
        ],
        borderColor: "#12181E",
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="overflow-y-auto h-[76vh] space-y-4 rounded-md">
      {/* Contenedor de cubos con tamaño fijo */}
      <div className="grid grid-cols-2 gap-[8px] w-full">
        {/* Cubo 1 con gráfico de barras */}
        <div className="w-full h-[450px] bg-[#12181E] rounded-md p-4 flex flex-col justify-center items-center">
          <Bar data={barData} options={barOptions} />

          {/* Círculos de colores con nombres */}
          <div className="mt-4 flex justify-between w-full px-10">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: "#FFFBD5" }}></div>
              <span className="text-white">White</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: "#AAE0FA" }}></div>
              <span className="text-white">Blue</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: "#CBC2BF" }}></div>
              <span className="text-white">Black</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: "#F9AA8F" }}></div>
              <span className="text-white">Red</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: "#9BD3AE" }}></div>
              <span className="text-white">Green</span>
            </div>
          </div>
        </div>

        {/* Cubo 2 con gráfico de pie para Mana Costs */}
        <div className="w-full h-[450px] bg-[#12181E] rounded-md p-4 flex flex-col justify-center items-center">
          <h2 className="text-white text-xl mb-4">Mana Costs</h2>
          <div className="w-3/4"> {/* Ajustar tamaño del gráfico */}
            <Pie data={pieDataCosts} options={pieOptions} />
          </div>
        </div>

        {/* Cubo 3 con gráfico de pie para Mana Production */}
        <div className="w-full h-[450px] bg-[#12181E] rounded-md p-4 flex flex-col justify-center items-center">
          <h2 className="text-white text-xl mb-4">Mana Production</h2>
          <div className="w-3/4"> {/* Ajustar tamaño del gráfico */}
            <Pie data={pieDataProduction} options={pieOptions} />
          </div>
        </div>

        {/* Cubo 4 con gráfico de pie para Card Types */}
        <div className="w-full h-[450px] bg-[#12181E] rounded-md p-4 flex flex-col justify-center items-center">
          <h2 className="text-white text-xl mb-4">Card Types</h2>
          <div className="w-3/4"> {/* Ajustar tamaño del gráfico */}
            <Pie data={pieDataTypes} options={pieOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsideDecksProperties;