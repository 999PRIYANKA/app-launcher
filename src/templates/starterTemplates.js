import { getDefaultContent } from "../components/marketing/Sections";

// Helper to create section with unique ID
const createSection = (type, index) => ({
  id: `${type}-${index}`,
  type,
  isVisible: true,
  content: getDefaultContent(type),
});

// Starter Templates
export const STARTER_TEMPLATES = {
  "SaaS Landing": [
    createSection("hero", 1),
    createSection("features", 2),
    createSection("testimonials", 3),
    createSection("pricing", 4),
    createSection("faq", 5),
    createSection("contact", 6),
    createSection("footer", 7),
  ],
  "Business Website": [
    createSection("hero", 1),
    createSection("about", 2),
    createSection("features", 3),
    createSection("testimonials", 4),
    createSection("contact", 5),
    createSection("footer", 6),
  ],
  "Product Landing": [
    createSection("hero", 1),
    createSection("features", 2),
    createSection("pricing", 3),
    createSection("testimonials", 4),
    createSection("faq", 5),
    createSection("footer", 6),
  ],
  "Minimal Portfolio": [
    createSection("hero", 1),
    createSection("about", 2),
    createSection("contact", 3),
    createSection("footer", 4),
  ],
};

