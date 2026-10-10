// Replace with agency-approved photography before launch (see README).
const u = (id: string, w = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=70&fm=webp`;

export const img = {
  hero: u("photo-1545324418-cc1a3fa10c00", 2000),
  apartment1: u("photo-1522708323590-d24dbb6b0267", 1200),
  apartment2: u("photo-1502672260266-1c1ef2d93688", 1200),
  apartment3: u("photo-1560448204-e02f11c3d0e2", 1200),
  house: u("photo-1512917774080-9991f1c4c750", 1200),
  tower: u("photo-1486406146926-c627a92ad1ab", 1600),
  office: u("photo-1497366216548-37526070297c", 1200),
  shop: u("photo-1441986300917-64674bd600d8", 1200),
  city: u("photo-1600585154340-be6161a56a0c", 1600),
  interior: u("photo-1560185007-cde436f6a4d0", 1600),
  cta: u("photo-1460317442991-0ec209397118", 2000),
};
