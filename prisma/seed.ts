import { PrismaClient, CropType } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const farmers = [
    {
      document: "72856956882",
      producerName: "João Silva",
      farmName: "Fazenda Sol",
      state: "SP",
      city: "São Paulo",
      totalArea: 500.5,
      arableArea: 300.5,
      vegetationArea: 150,
      crops: {
        create: [{ name: CropType.SOYBEAN }, { name: CropType.CORN }],
      },
    },
    {
      document: "31959841726",
      producerName: "Maria Oliveira",
      farmName: "Fazenda Verde",
      state: "RJ",
      city: "Niterói",
      totalArea: 600.5,
      arableArea: 350,
      vegetationArea: 250.5,
      crops: {
        create: [{ name: CropType.COFFEE }],
      },
    },
    {
      document: "39538276698",
      producerName: "Carlos Pereira",
      farmName: "Fazenda Campo Aberto",
      state: "MG",
      city: "Belo Horizonte",
      totalArea: 450.3,
      arableArea: 200,
      vegetationArea: 150,
      crops: {
        create: [{ name: CropType.SUGARCANE }, { name: CropType.CORN }],
      },
    },
    {
      document: "40465854044",
      producerName: "Ana Souza",
      farmName: "Fazenda Oceano",
      state: "RS",
      city: "Porto Alegre",
      totalArea: 780,
      arableArea: 500,
      vegetationArea: 280,
      crops: {
        create: [{ name: CropType.COTTON }],
      },
    },
    {
      document: "75115147580",
      producerName: "Roberto Costa",
      farmName: "Fazenda Pico Alto",
      state: "BA",
      city: "Salvador",
      totalArea: 600.6,
      arableArea: 300,
      vegetationArea: 200,
      crops: {
        create: [{ name: CropType.COFFEE }, { name: CropType.SOYBEAN }],
      },
    },
    {
      document: "62681365198",
      producerName: "Lucas Almeida",
      farmName: "Fazenda Vista Alegre",
      state: "GO",
      city: "Goiânia",
      totalArea: 820.4,
      arableArea: 600,
      vegetationArea: 220.4,
      crops: {
        create: [{ name: CropType.CORN }],
      },
    },
    {
      document: "86814512000107",
      producerName: "Emily Carvalho",
      farmName: "Fazenda Esperança",
      state: "PE",
      city: "Recife",
      totalArea: 490.7,
      arableArea: 250,
      vegetationArea: 190.7,
      crops: {
        create: [{ name: CropType.SUGARCANE }],
      },
    },
    {
      document: "66964375000180",
      producerName: "Pedro Andrade",
      farmName: "Fazenda Bela Vista",
      state: "SC",
      city: "Joinville",
      totalArea: 550.5,
      arableArea: 300,
      vegetationArea: 200.5,
      crops: {
        create: [{ name: CropType.COTTON }],
      },
    },
    {
      document: "76669512000107",
      producerName: "Daniel Gomes",
      farmName: "Fazenda Lago Azul",
      state: "MT",
      city: "Cuiabá",
      totalArea: 660.3,
      arableArea: 400,
      vegetationArea: 260.3,
      crops: {
        create: [{ name: CropType.SOYBEAN }],
      },
    },
    {
      document: "07659138000146",
      producerName: "Sofia Lima",
      farmName: "Fazenda Horizonte",
      state: "CE",
      city: "Fortaleza",
      totalArea: 720.9,
      arableArea: 400,
      vegetationArea: 220.9,
      crops: {
        create: [{ name: CropType.COFFEE }, { name: CropType.CORN }],
      },
    },
  ];

  for (const farmer of farmers) {
    await prisma.farmer.create({
      data: farmer,
    });
  }

  console.info("Farmers and crops have been seeded");
}

try {
  main();
} catch (error) {
  console.error("Error during database seed: ", error);
} finally {
  await prisma.$disconnect();
}
