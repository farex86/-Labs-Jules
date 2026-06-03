// Constants for the Solar Calculator

export const CONSUMPTION_PATTERNS = [
  {
    "id": "ice_factory",
    "name": "مصنع ثلج (Ice Factory)",
    "devices": [
      {
        "id": "d1",
        "name": "أجهزة عامة (General Devices)",
        "powerW": 1000,
        "qty": 1,
        "hoursPerDay": 8
      },
      {
        "id": "d2",
        "name": "إضاءة (Lights)",
        "powerW": 20,
        "qty": 10,
        "hoursPerDay": 8
      }
    ]
  },
  {
    "id": "company",
    "name": "شركة (Company)",
    "devices": [
      {
        "id": "d1",
        "name": "أجهزة عامة (General Devices)",
        "powerW": 1000,
        "qty": 1,
        "hoursPerDay": 8
      },
      {
        "id": "d2",
        "name": "إضاءة (Lights)",
        "powerW": 20,
        "qty": 10,
        "hoursPerDay": 8
      }
    ]
  },
  {
    "id": "farm",
    "name": "مزرعة (Farm)",
    "devices": [
      {
        "id": "f1",
        "name": "مضخة غاطسة (Submersible Pump)",
        "powerW": 5000,
        "qty": 1,
        "hoursPerDay": 6
      },
      {
        "id": "f2",
        "name": "إضاءة (Lights)",
        "powerW": 30,
        "qty": 10,
        "hoursPerDay": 10
      }
    ]
  },
  {
    "id": "poultry_farm",
    "name": "مزرعة دواجن (Poultry Farm)",
    "devices": [
      {
        "id": "d1",
        "name": "أجهزة عامة (General Devices)",
        "powerW": 1000,
        "qty": 1,
        "hoursPerDay": 8
      },
      {
        "id": "d2",
        "name": "إضاءة (Lights)",
        "powerW": 20,
        "qty": 10,
        "hoursPerDay": 8
      }
    ]
  },
  {
    "id": "greenhouses",
    "name": "بيوت محمية (Greenhouses)",
    "devices": [
      {
        "id": "d1",
        "name": "أجهزة عامة (General Devices)",
        "powerW": 1000,
        "qty": 1,
        "hoursPerDay": 8
      },
      {
        "id": "d2",
        "name": "إضاءة (Lights)",
        "powerW": 20,
        "qty": 10,
        "hoursPerDay": 8
      }
    ]
  },
  {
    "id": "factory",
    "name": "مصنع (Factory)",
    "devices": [
      {
        "id": "d1",
        "name": "أجهزة عامة (General Devices)",
        "powerW": 1000,
        "qty": 1,
        "hoursPerDay": 8
      },
      {
        "id": "d2",
        "name": "إضاءة (Lights)",
        "powerW": 20,
        "qty": 10,
        "hoursPerDay": 8
      }
    ]
  },
  {
    "id": "clinic",
    "name": "مستوصف (Clinic)",
    "devices": [
      {
        "id": "d1",
        "name": "أجهزة عامة (General Devices)",
        "powerW": 1000,
        "qty": 1,
        "hoursPerDay": 8
      },
      {
        "id": "d2",
        "name": "إضاءة (Lights)",
        "powerW": 20,
        "qty": 10,
        "hoursPerDay": 8
      }
    ]
  },
  {
    "id": "hospital",
    "name": "مستشفى (Hospital)",
    "devices": [
      {
        "id": "d1",
        "name": "أجهزة عامة (General Devices)",
        "powerW": 1000,
        "qty": 1,
        "hoursPerDay": 8
      },
      {
        "id": "d2",
        "name": "إضاءة (Lights)",
        "powerW": 20,
        "qty": 10,
        "hoursPerDay": 8
      }
    ]
  },
  {
    "id": "bakery",
    "name": "مخبز (Bakery)",
    "devices": [
      {
        "id": "d1",
        "name": "أجهزة عامة (General Devices)",
        "powerW": 1000,
        "qty": 1,
        "hoursPerDay": 8
      },
      {
        "id": "d2",
        "name": "إضاءة (Lights)",
        "powerW": 20,
        "qty": 10,
        "hoursPerDay": 8
      }
    ]
  },
  {
    "id": "shop",
    "name": "دكان (Shop)",
    "devices": [
      {
        "id": "s1",
        "name": "ثلاجة (Refrigerator)",
        "powerW": 300,
        "qty": 2,
        "hoursPerDay": 24
      },
      {
        "id": "s2",
        "name": "مكيف (AC)",
        "powerW": 1500,
        "qty": 1,
        "hoursPerDay": 12
      },
      {
        "id": "s3",
        "name": "إضاءة (Lights)",
        "powerW": 20,
        "qty": 5,
        "hoursPerDay": 12
      },
      {
        "id": "s4",
        "name": "مروحة (Fan)",
        "powerW": 80,
        "qty": 1,
        "hoursPerDay": 12
      }
    ]
  },
  {
    "id": "workshop",
    "name": "ورشة (Workshop)",
    "devices": [
      {
        "id": "d1",
        "name": "أجهزة عامة (General Devices)",
        "powerW": 1000,
        "qty": 1,
        "hoursPerDay": 8
      },
      {
        "id": "d2",
        "name": "إضاءة (Lights)",
        "powerW": 20,
        "qty": 10,
        "hoursPerDay": 8
      }
    ]
  },
  {
    "id": "water_pump",
    "name": "مضخة مياه (Water Pump)",
    "devices": [
      {
        "id": "d1",
        "name": "أجهزة عامة (General Devices)",
        "powerW": 1000,
        "qty": 1,
        "hoursPerDay": 8
      },
      {
        "id": "d2",
        "name": "إضاءة (Lights)",
        "powerW": 20,
        "qty": 10,
        "hoursPerDay": 8
      }
    ]
  },
  {
    "id": "donkey",
    "name": "دونكي (Well Pump)",
    "devices": [
      {
        "id": "d1",
        "name": "أجهزة عامة (General Devices)",
        "powerW": 1000,
        "qty": 1,
        "hoursPerDay": 8
      },
      {
        "id": "d2",
        "name": "إضاءة (Lights)",
        "powerW": 20,
        "qty": 10,
        "hoursPerDay": 8
      }
    ]
  },
  {
    "id": "mosque",
    "name": "مسجد (Mosque)",
    "devices": [
      {
        "id": "m1",
        "name": "مكيف (AC)",
        "powerW": 1500,
        "qty": 4,
        "hoursPerDay": 8
      },
      {
        "id": "m2",
        "name": "مراوح (Fans)",
        "powerW": 80,
        "qty": 10,
        "hoursPerDay": 8
      },
      {
        "id": "m3",
        "name": "إضاءة (Lights)",
        "powerW": 20,
        "qty": 20,
        "hoursPerDay": 8
      },
      {
        "id": "m4",
        "name": "مكبر صوت (Sound System)",
        "powerW": 150,
        "qty": 1,
        "hoursPerDay": 2
      }
    ]
  },
  {
    "id": "printing_press",
    "name": "مطبعة (Printing Press)",
    "devices": [
      {
        "id": "d1",
        "name": "أجهزة عامة (General Devices)",
        "powerW": 1000,
        "qty": 1,
        "hoursPerDay": 8
      },
      {
        "id": "d2",
        "name": "إضاءة (Lights)",
        "powerW": 20,
        "qty": 10,
        "hoursPerDay": 8
      }
    ]
  },
  {
    "id": "coffee_shop",
    "name": "كوفي شوب (Coffee Shop)",
    "devices": [
      {
        "id": "d1",
        "name": "أجهزة عامة (General Devices)",
        "powerW": 1000,
        "qty": 1,
        "hoursPerDay": 8
      },
      {
        "id": "d2",
        "name": "إضاءة (Lights)",
        "powerW": 20,
        "qty": 10,
        "hoursPerDay": 8
      }
    ]
  },
  {
    "id": "restaurant",
    "name": "مطعم (Restaurant)",
    "devices": [
      {
        "id": "d1",
        "name": "أجهزة عامة (General Devices)",
        "powerW": 1000,
        "qty": 1,
        "hoursPerDay": 8
      },
      {
        "id": "d2",
        "name": "إضاءة (Lights)",
        "powerW": 20,
        "qty": 10,
        "hoursPerDay": 8
      }
    ]
  },
  {
    "id": "hotel",
    "name": "فندق (Hotel)",
    "devices": [
      {
        "id": "d1",
        "name": "أجهزة عامة (General Devices)",
        "powerW": 1000,
        "qty": 1,
        "hoursPerDay": 8
      },
      {
        "id": "d2",
        "name": "إضاءة (Lights)",
        "powerW": 20,
        "qty": 10,
        "hoursPerDay": 8
      }
    ]
  },
  {
    "id": "bank",
    "name": "بنك (Bank)",
    "devices": [
      {
        "id": "d1",
        "name": "أجهزة عامة (General Devices)",
        "powerW": 1000,
        "qty": 1,
        "hoursPerDay": 8
      },
      {
        "id": "d2",
        "name": "إضاءة (Lights)",
        "powerW": 20,
        "qty": 10,
        "hoursPerDay": 8
      }
    ]
  },
  {
    "id": "supermarket",
    "name": "سوبر ماركت (Supermarket)",
    "devices": [
      {
        "id": "d1",
        "name": "أجهزة عامة (General Devices)",
        "powerW": 1000,
        "qty": 1,
        "hoursPerDay": 8
      },
      {
        "id": "d2",
        "name": "إضاءة (Lights)",
        "powerW": 20,
        "qty": 10,
        "hoursPerDay": 8
      }
    ]
  },
  {
    "id": "fuel_station",
    "name": "طرمبة وقود (Fuel Station)",
    "devices": [
      {
        "id": "d1",
        "name": "أجهزة عامة (General Devices)",
        "powerW": 1000,
        "qty": 1,
        "hoursPerDay": 8
      },
      {
        "id": "d2",
        "name": "إضاءة (Lights)",
        "powerW": 20,
        "qty": 10,
        "hoursPerDay": 8
      }
    ]
  },
  {
    "id": "mining_company",
    "name": "شركة تعدين (Mining Company)",
    "devices": [
      {
        "id": "d1",
        "name": "أجهزة عامة (General Devices)",
        "powerW": 1000,
        "qty": 1,
        "hoursPerDay": 8
      },
      {
        "id": "d2",
        "name": "إضاءة (Lights)",
        "powerW": 20,
        "qty": 10,
        "hoursPerDay": 8
      }
    ]
  }
];

export const SOLAR_CONSTANTS = {
  INVERTER_EFFICIENCY: 0.9,
  SYSTEM_VOLTAGE: 48, // 48V standard for larger systems
  PEAK_SUN_HOURS: 5.5, // average PSH
  BATTERY_DEPTH_OF_DISCHARGE: 0.8, // Lithium default
  SAFETY_FACTOR: 1.25, // 25% extra capacity for inverter and panels
};
