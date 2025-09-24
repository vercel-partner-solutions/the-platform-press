import type { Article, Category, CMSArticle, CMSCategory } from "./types";

const placeholderArticles: Article[] = [
  {
    id: "1",
    slug: "ai-revolutionizing-tech",
    title:
      "The AI Revolution: How Artificial Intelligence is Reshaping the Tech Landscape",
    excerpt:
      "An in-depth look at the transformative power of AI across various sectors, from healthcare to finance.",
    content: `Artificial intelligence (AI) is no longer a futuristic concept; it's a present-day reality transforming industries at an unprecedented pace. This article explores the multifaceted impact of AI, delving into its applications, challenges, and future prospects.

### Key Areas of AI Transformation

*   **Healthcare:** AI algorithms are diagnosing diseases with greater accuracy, personalizing treatment plans, and accelerating drug discovery.
*   **Finance:** From fraud detection to algorithmic trading and personalized financial advice, AI is reshaping financial services.
*   **Transportation:** Autonomous vehicles are on the horizon, promising safer and more efficient transportation systems.
*   **Entertainment:** Recommendation engines, content generation, and personalized experiences are driven by AI.

### Challenges and Ethical Considerations

Despite its potential, AI development and deployment come with challenges. Bias in AI algorithms, job displacement, privacy concerns, and the need for robust regulatory frameworks are critical issues that need addressing.

### The Future of AI

The future of AI points towards even more integration into our daily lives. Advances in general AI, quantum computing, and neuromorphic chips could unlock capabilities we can only imagine today. Ensuring responsible innovation will be key to harnessing AI's full potential for the betterment of humanity.`,
    imageUrl: "/placeholder.svg?width=800&height=450",
    category: "Technology",
    author: "Dr. Eva Core",
    datePublished: "2025-06-26T10:00:00Z",
    readingTime: 7,
    isBreaking: true,
    isFeatured: true,
    views: 1200,
  },
  {
    id: "11",
    slug: "quantum-internet-future",
    title: "The Future of Quantum Internet: Secure and Unhackable?",
    excerpt:
      "Exploring the potential of quantum networks to revolutionize secure communication.",
    content: `The quantum internet promises a new era of communication...`, // Content truncated for brevity
    imageUrl: "/placeholder.svg?width=800&height=450",
    category: "Technology",
    author: "Dr. Anya Sharma",
    datePublished: "2025-06-25T14:00:00Z",
    readingTime: 6,
    views: 850,
  },
  {
    id: "12",
    slug: "ethical-ai-bias-ml",
    title: "Ethical AI: Navigating Bias in Machine Learning Models",
    excerpt:
      "A deep dive into identifying and mitigating bias in AI to ensure fairness and equity.",
    content: `As AI systems become more integrated...`, // Content truncated
    imageUrl: "/placeholder.svg?width=800&height=450",
    category: "Technology",
    author: "Prof. Ben Carter",
    datePublished: "2025-06-24T11:00:00Z",
    readingTime: 7,
    views: 920,
  },
  {
    id: "2",
    slug: "global-economic-outlook-2025",
    title: "Global Economic Outlook 2025: Navigating Uncertainty and Growth",
    excerpt:
      "Experts weigh in on the key economic trends, challenges, and opportunities for the coming year.",
    content: `The global economy in 2025 is poised at a crossroads...`, // Content truncated
    imageUrl: "/placeholder.svg?width=800&height=450",
    category: "Business",
    author: "Marcus Finch",
    datePublished: "2025-06-23T14:30:00Z",
    readingTime: 5,
    views: 1080, // Boosted views
  },
  {
    id: "13",
    slug: "next-gen-wearables-beyond-fitness",
    title: "Next-Gen Wearables: Beyond Fitness Tracking",
    excerpt:
      "Smart rings, neural interfaces, and advanced biosensors are pushing the boundaries of wearable technology.",
    content: `Wearable technology is evolving far beyond simple fitness trackers...`, // Content truncated
    imageUrl: "/placeholder.svg?width=800&height=450",
    category: "Technology",
    author: "Dr. Lena Hanson",
    datePublished: "2025-06-22T09:00:00Z",
    readingTime: 5,
    views: 780,
  },
  {
    id: "3",
    slug: "space-exploration-new-frontiers",
    title: "New Frontiers in Space Exploration: Mars, the Moon, and Beyond",
    excerpt:
      "A look at the latest missions and technological advancements pushing the boundaries of human presence in space.",
    content: `Humanity is entering a new golden age of space exploration...`, // Content truncated
    imageUrl: "/placeholder.svg?width=800&height=450",
    category: "Science",
    author: "Dr. Aris Thorne",
    datePublished: "2025-06-21T09:15:00Z",
    readingTime: 6,
    views: 1150, // Boosted views
  },
  {
    id: "4",
    slug: "opinion-future-of-work",
    title: "Opinion: The Hybrid Model is a Compromise, Not a Solution",
    excerpt:
      "Why forcing employees back to the office, even part-time, misses the point of true flexibility.",
    content: `The debate around remote versus office work rages on...`, // Content truncated
    imageUrl: "/placeholder.svg?width=800&height=450",
    category: "Opinion",
    author: "Alex Chen, Workplace Strategist",
    datePublished: "2025-06-20T11:00:00Z",
    readingTime: 4,
    views: 1500,
  },
  {
    id: "5",
    slug: "sustainable-living-urban-future",
    title: "Sustainable Living: Designing the Eco-Cities of Tomorrow",
    excerpt:
      "Exploring innovative approaches to create greener, more resilient urban environments.",
    content: `As the world's population becomes increasingly urbanized...`, // Content truncated
    imageUrl: "/placeholder.svg?width=800&height=450",
    category: "World",
    author: "Kenji Tanaka",
    datePublished: "2025-06-19T16:45:00Z", // Made slightly older
    readingTime: 6,
    views: 1020, // Boosted views
  },
  {
    id: "6",
    slug: "tech-startup-funding-winter",
    title: "Navigating the 'Funding Winter': Advice for Tech Startups",
    excerpt:
      "Strategies for securing investment and managing cash flow in a challenging economic climate for tech.",
    content: `Navigating the 'Funding Winter' can be challenging...`, // Content truncated
    imageUrl: "/placeholder.svg?width=800&height=450",
    category: "Technology", // This is still Tech, might be excluded by Tech section
    author: "Sarah Lee",
    datePublished: "2025-06-18T10:00:00Z", // Made older
    readingTime: 5,
    views: 970, // Boosted views
  },
  {
    id: "7",
    slug: "opinion-social-media-divide",
    title: "Opinion: Is Social Media Driving Us Further Apart?",
    excerpt:
      "A critical look at how algorithms and echo chambers might be eroding constructive public discourse.",
    content: `Social media promised to connect the world...`, // Content truncated
    imageUrl: "/placeholder.svg?width=800&height=450",
    category: "Opinion",
    author: "Dr. Ben Carter, Sociologist",
    datePublished: "2025-06-17T15:00:00Z", // Made older
    readingTime: 5,
    views: 900,
  },
  {
    id: "8",
    slug: "quantum-computing-breakthrough",
    title:
      "Quantum Leap: Researchers Announce Major Breakthrough in Qubit Stability",
    excerpt:
      "A new technique could pave the way for more reliable and powerful quantum computers.",
    content: `Researchers have made a significant breakthrough...`, // Content truncated
    imageUrl: "/placeholder.svg?width=800&height=450",
    category: "Science",
    author: "Maria Gonzalez",
    datePublished: "2025-06-16T12:00:00Z", // Made older
    readingTime: 6,
    views: 1350, // Boosted views, should be a top popular candidate
  },
  {
    id: "9",
    slug: "business-ai-ethics-framework",
    title: "Implementing an Ethical AI Framework in Your Business",
    excerpt:
      "Practical steps for businesses to adopt responsible AI practices and build trust.",
    content: `Implementing an ethical AI framework is crucial...`, // Content truncated
    imageUrl: "/placeholder.svg?width=800&height=450",
    category: "Business",
    author: "David Miller",
    datePublished: "2025-06-15T09:00:00Z", // Made older
    readingTime: 5,
    views: 990, // Boosted views
  },
  {
    id: "10",
    slug: "deep-sea-exploration-discoveries",
    title: "Mysteries of the Deep: New Species Discovered in Mariana Trench",
    excerpt:
      "Latest expedition uncovers bizarre and fascinating creatures from the ocean's deepest point.",
    content: `The latest expedition to the Mariana Trench...`, // Content truncated
    imageUrl: "/placeholder.svg?width=800&height=450",
    category: "Science",
    author: "Oceanus Research Team",
    datePublished: "2025-06-14T08:00:00Z", // Made older
    readingTime: 4,
    views: 1010, // Boosted views
  },
  // Additional Technology Articles
  {
    id: "14",
    slug: "5g-network-rollout-challenges",
    title:
      "5G Network Rollout: Overcoming Infrastructure and Security Challenges",
    excerpt:
      "Examining the technical hurdles and cybersecurity concerns as 5G networks expand globally.",
    content: `The global rollout of 5G networks represents one of the most significant technological infrastructure projects of our time...`,
    imageUrl: "/placeholder.svg?width=800&height=450",
    category: "Technology",
    author: "Dr. Rachel Kim",
    datePublished: "2025-06-25T16:00:00Z",
    readingTime: 6,
    views: 1180,
  },
  {
    id: "15",
    slug: "blockchain-beyond-cryptocurrency",
    title: "Blockchain Beyond Cryptocurrency: Real-World Applications Emerging",
    excerpt:
      "From supply chain management to digital identity, blockchain technology is finding practical uses beyond digital currency.",
    content: `While cryptocurrency grabbed headlines, blockchain's true potential lies in its diverse applications...`,
    imageUrl: "/placeholder.svg?width=800&height=450",
    category: "Technology",
    author: "Marcus Chen",
    datePublished: "2025-06-24T13:30:00Z",
    readingTime: 7,
    views: 1050,
  },
  {
    id: "16",
    slug: "cybersecurity-threats-2025",
    title: "Cybersecurity in 2025: New Threats and Defense Strategies",
    excerpt:
      "As digital transformation accelerates, cybersecurity professionals face evolving threats and must adapt their strategies.",
    content: `The cybersecurity landscape in 2025 is more complex than ever before...`,
    imageUrl: "/placeholder.svg?width=800&height=450",
    category: "Technology",
    author: "Sarah Martinez",
    datePublished: "2025-06-23T10:15:00Z",
    readingTime: 8,
    views: 1320,
  },
  {
    id: "17",
    slug: "edge-computing-revolution",
    title: "Edge Computing: Bringing Processing Power Closer to Data Sources",
    excerpt:
      "How edge computing is reducing latency and improving performance for IoT devices and real-time applications.",
    content: `Edge computing is transforming how we process and analyze data...`,
    imageUrl: "/placeholder.svg?width=800&height=450",
    category: "Technology",
    author: "Dr. James Liu",
    datePublished: "2025-06-22T14:45:00Z",
    readingTime: 6,
    views: 890,
  },
  {
    id: "18",
    slug: "virtual-reality-enterprise-adoption",
    title: "Virtual Reality Goes Mainstream: Enterprise Adoption Accelerates",
    excerpt:
      "Companies are increasingly using VR for training, collaboration, and customer experiences beyond gaming.",
    content: `Virtual reality technology has matured beyond entertainment applications...`,
    imageUrl: "/placeholder.svg?width=800&height=450",
    category: "Technology",
    author: "Emma Thompson",
    datePublished: "2025-06-21T11:20:00Z",
    readingTime: 5,
    views: 1150,
  },

  // Additional Opinion Articles
  {
    id: "19",
    slug: "opinion-climate-tech-solutions",
    title: "Opinion: Why Climate Tech Needs More Than Just Venture Capital",
    excerpt:
      "Solving climate change requires systemic thinking beyond Silicon Valley's typical approach to innovation.",
    content: `The climate crisis demands urgent action, but our current approach to climate technology funding is fundamentally flawed...`,
    imageUrl: "/placeholder.svg?width=800&height=450",
    category: "Opinion",
    author: "Dr. Maria Santos, Climate Policy Expert",
    datePublished: "2025-06-24T09:00:00Z",
    readingTime: 6,
    views: 1400,
  },
  {
    id: "20",
    slug: "opinion-digital-privacy-rights",
    title:
      "Opinion: Digital Privacy Should Be a Human Right, Not a Premium Feature",
    excerpt:
      "The current model of trading privacy for convenience is unsustainable and fundamentally unfair.",
    content: `In our increasingly digital world, privacy has become a luxury good...`,
    imageUrl: "/placeholder.svg?width=800&height=450",
    category: "Opinion",
    author: "Alex Rivera, Digital Rights Advocate",
    datePublished: "2025-06-23T15:30:00Z",
    readingTime: 5,
    views: 1650,
  },
  {
    id: "21",
    slug: "opinion-education-technology-gap",
    title:
      "Opinion: The Education Technology Gap is Widening Social Inequality",
    excerpt:
      "Remote learning has exposed how technology access determines educational outcomes more than ever before.",
    content: `The pandemic forced education online, revealing a harsh truth about digital inequality...`,
    imageUrl: "/placeholder.svg?width=800&height=450",
    category: "Opinion",
    author: "Prof. Jennifer Walsh, Education Policy",
    datePublished: "2025-06-22T12:00:00Z",
    readingTime: 7,
    views: 1200,
  },
  {
    id: "22",
    slug: "opinion-gig-economy-workers-rights",
    title: "Opinion: The Gig Economy Needs a New Social Contract",
    excerpt:
      "Traditional employment protections don't fit the modern gig economy, leaving millions of workers vulnerable.",
    content: `The rise of the gig economy has fundamentally changed how we work...`,
    imageUrl: "/placeholder.svg?width=800&height=450",
    category: "Opinion",
    author: "Robert Kim, Labor Economics",
    datePublished: "2025-06-21T16:45:00Z",
    readingTime: 6,
    views: 1350,
  },
  {
    id: "23",
    slug: "opinion-urban-planning-future",
    title:
      "Opinion: Cities Must Prioritize People Over Cars in Post-Pandemic Planning",
    excerpt:
      "The pandemic showed us what cities could be like with less traffic. We shouldn't go back to the old ways.",
    content: `The COVID-19 pandemic gave us an unexpected glimpse into what our cities could become...`,
    imageUrl: "/placeholder.svg?width=800&height=450",
    category: "Opinion",
    author: "Dr. Lisa Chen, Urban Planning",
    datePublished: "2025-06-20T13:15:00Z",
    readingTime: 5,
    views: 980,
  },

  // Additional High-View Articles for Popular Section
  {
    id: "24",
    slug: "breakthrough-cancer-treatment",
    title:
      "Revolutionary Cancer Treatment Shows 90% Success Rate in Clinical Trials",
    excerpt:
      "A new immunotherapy approach is showing unprecedented results in treating previously incurable cancers.",
    content: `Medical researchers have announced breakthrough results from a revolutionary cancer treatment...`,
    imageUrl: "/placeholder.svg?width=800&height=450",
    category: "Science",
    author: "Dr. Michael Foster",
    datePublished: "2025-06-25T08:00:00Z",
    readingTime: 8,
    views: 2100,
  },
  {
    id: "25",
    slug: "mars-mission-breakthrough",
    title: "NASA Announces Major Breakthrough in Mars Mission Technology",
    excerpt:
      "New propulsion system could cut travel time to Mars in half, making human missions more feasible.",
    content: `NASA scientists have developed a revolutionary propulsion system...`,
    imageUrl: "/placeholder.svg?width=800&height=450",
    category: "Science",
    author: "Dr. Amanda Rodriguez",
    datePublished: "2025-06-24T12:30:00Z",
    readingTime: 6,
    views: 1890,
  },
  {
    id: "26",
    slug: "renewable-energy-milestone",
    title:
      "Renewable Energy Reaches Historic Milestone: 50% of Global Power Generation",
    excerpt:
      "For the first time in history, renewable sources account for half of all electricity generated worldwide.",
    content: `A historic milestone has been reached in the global transition to clean energy...`,
    imageUrl: "/placeholder.svg?width=800&height=450",
    category: "World",
    author: "Elena Petrov",
    datePublished: "2025-06-23T14:00:00Z",
    readingTime: 5,
    views: 1750,
  },
  {
    id: "27",
    slug: "tech-giants-antitrust-ruling",
    title: "Historic Antitrust Ruling Forces Tech Giant Breakup",
    excerpt:
      "Federal court orders major technology company to split into separate entities, marking biggest antitrust action in decades.",
    content: `In a landmark decision that could reshape the technology industry...`,
    imageUrl: "/placeholder.svg?width=800&height=450",
    category: "Business",
    author: "Jonathan Hayes",
    datePublished: "2025-06-22T16:00:00Z",
    readingTime: 7,
    views: 1680,
  },
  {
    id: "28",
    slug: "artificial-general-intelligence-debate",
    title: "The AGI Debate: Are We Ready for Artificial General Intelligence?",
    excerpt:
      "As AI capabilities rapidly advance, experts debate whether we're prepared for the implications of AGI.",
    content: `The prospect of Artificial General Intelligence (AGI) is no longer science fiction...`,
    imageUrl: "/placeholder.svg?width=800&height=450",
    category: "Technology",
    author: "Dr. Priya Patel",
    datePublished: "2025-06-21T10:30:00Z",
    readingTime: 9,
    views: 1580,
  },

  // Additional Business Articles
  {
    id: "29",
    slug: "supply-chain-resilience-strategies",
    title: "Building Supply Chain Resilience: Lessons from Global Disruptions",
    excerpt:
      "Companies are rethinking their supply chain strategies to withstand future disruptions and uncertainties.",
    content: `The global supply chain disruptions of recent years have forced businesses to fundamentally rethink their approach...`,
    imageUrl: "/placeholder.svg?width=800&height=450",
    category: "Business",
    author: "Patricia Wong",
    datePublished: "2025-06-25T11:00:00Z",
    readingTime: 6,
    views: 1120,
  },
  {
    id: "30",
    slug: "sustainable-business-practices-roi",
    title:
      "The ROI of Sustainable Business Practices: Beyond Environmental Benefits",
    excerpt:
      "New research shows that sustainable business practices deliver measurable financial returns alongside environmental benefits.",
    content: `Sustainability is no longer just about doing good for the planet—it's about doing well for business...`,
    imageUrl: "/placeholder.svg?width=800&height=450",
    category: "Business",
    author: "Dr. Michael Chen",
    datePublished: "2025-06-24T15:45:00Z",
    readingTime: 7,
    views: 980,
  },
  {
    id: "31",
    slug: "fintech-banking-disruption",
    title:
      "Fintech Revolution: How Digital Banks Are Reshaping Financial Services",
    excerpt:
      "Traditional banks face unprecedented competition as fintech companies offer innovative, customer-centric solutions.",
    content: `The financial services industry is undergoing its most significant transformation in decades...`,
    imageUrl: "/placeholder.svg?width=800&height=450",
    category: "Business",
    author: "Rachel Thompson",
    datePublished: "2025-06-23T09:30:00Z",
    readingTime: 6,
    views: 1250,
  },
  {
    id: "32",
    slug: "remote-work-productivity-metrics",
    title:
      "Measuring Remote Work Success: New Metrics for the Distributed Workforce",
    excerpt:
      "Companies are developing new ways to measure productivity and engagement in remote and hybrid work environments.",
    content: `As remote work becomes permanent for many organizations, traditional productivity metrics are proving inadequate...`,
    imageUrl: "/placeholder.svg?width=800&height=450",
    category: "Business",
    author: "James Rodriguez",
    datePublished: "2025-06-22T13:15:00Z",
    readingTime: 5,
    views: 890,
  },
  {
    id: "33",
    slug: "esg-investing-mainstream",
    title: "ESG Investing Goes Mainstream: Impact on Corporate Strategy",
    excerpt:
      "Environmental, Social, and Governance factors are becoming central to investment decisions and corporate planning.",
    content: `ESG investing has moved from niche to mainstream, fundamentally changing how companies approach strategy...`,
    imageUrl: "/placeholder.svg?width=800&height=450",
    category: "Business",
    author: "Sarah Kim",
    datePublished: "2025-06-21T14:20:00Z",
    readingTime: 8,
    views: 1150,
  },
  {
    id: "34",
    slug: "small-business-digital-transformation",
    title:
      "Small Business Digital Transformation: Competing with Enterprise Solutions",
    excerpt:
      "Small businesses are leveraging affordable digital tools to compete with larger enterprises in unprecedented ways.",
    content: `The digital divide between small businesses and large enterprises is rapidly closing...`,
    imageUrl: "/placeholder.svg?width=800&height=450",
    category: "Business",
    author: "Maria Gonzalez",
    datePublished: "2025-06-20T10:45:00Z",
    readingTime: 6,
    views: 750,
  },
  {
    id: "35",
    slug: "cryptocurrency-corporate-adoption",
    title: "Corporate Cryptocurrency Adoption: Beyond Payment Processing",
    excerpt:
      "Major corporations are exploring cryptocurrency for treasury management, employee payments, and customer rewards.",
    content: `Corporate adoption of cryptocurrency is expanding beyond simple payment processing...`,
    imageUrl: "/placeholder.svg?width=800&height=450",
    category: "Business",
    author: "David Park",
    datePublished: "2025-06-19T12:00:00Z",
    readingTime: 7,
    views: 1320,
  },
  {
    id: "36",
    slug: "downtown-revitalization-project",
    title: "Downtown Revitalization Project Breaks Ground This Month",
    excerpt:
      "City officials announce the start of a $50 million downtown development project aimed at boosting local economy.",
    content: `The long-awaited downtown revitalization project officially begins construction this month...`,
    imageUrl: "/placeholder.svg?width=800&height=450",
    category: "Local",
    author: "Jennifer Martinez",
    datePublished: "2025-06-26T14:00:00Z",
    readingTime: 4,
    views: 450,
  },
  {
    id: "37",
    slug: "local-school-district-budget-approved",
    title: "School District Approves Record Budget for Technology Upgrades",
    excerpt:
      "Local school board unanimously approves $15 million budget increase focused on digital learning infrastructure.",
    content: `The school district has approved its largest budget increase in over a decade...`,
    imageUrl: "/placeholder.svg?width=800&height=450",
    category: "Local",
    author: "Michael Chen",
    datePublished: "2025-06-25T16:30:00Z",
    readingTime: 5,
    views: 320,
  },
  {
    id: "38",
    slug: "new-public-transit-routes",
    title: "Three New Bus Routes to Connect Underserved Neighborhoods",
    excerpt:
      "Transit authority announces expansion of public transportation to improve access for residents in outer districts.",
    content: `The metropolitan transit authority has announced plans for three new bus routes...`,
    imageUrl: "/placeholder.svg?width=800&height=450",
    category: "Local",
    author: "Sarah Williams",
    datePublished: "2025-06-24T11:15:00Z",
    readingTime: 3,
    views: 280,
  },
  {
    id: "39",
    slug: "community-park-renovation-complete",
    title: "Central Park Renovation Completed Ahead of Schedule",
    excerpt:
      "The $2.5 million park renovation project features new playgrounds, walking trails, and community gardens.",
    content: `After eight months of construction, the Central Park renovation has been completed...`,
    imageUrl: "/placeholder.svg?width=800&height=450",
    category: "Local",
    author: "David Thompson",
    datePublished: "2025-06-23T09:45:00Z",
    readingTime: 4,
    views: 380,
  },
  {
    id: "40",
    slug: "local-startup-funding-round",
    title: "Local Tech Startup Raises $10M in Series A Funding",
    excerpt:
      "GreenTech Solutions secures major funding round to expand their sustainable energy platform nationwide.",
    content: `A local technology startup focused on sustainable energy solutions has successfully raised...`,
    imageUrl: "/placeholder.svg?width=800&height=450",
    category: "Local",
    author: "Lisa Rodriguez",
    datePublished: "2025-06-22T13:20:00Z",
    readingTime: 5,
    views: 520,
  },
  {
    id: "41",
    slug: "farmers-market-expansion",
    title: "Weekly Farmers Market Expands to Three New Locations",
    excerpt:
      "Popular farmers market program grows to serve more neighborhoods with fresh, local produce and artisan goods.",
    content: `The city's successful farmers market program is expanding to three additional locations...`,
    imageUrl: "/placeholder.svg?width=800&height=450",
    category: "Local",
    author: "Robert Kim",
    datePublished: "2025-06-21T10:00:00Z",
    readingTime: 3,
    views: 290,
  },
];

async function fetchContent<T = any>(
  query: string,
  variables: Record<string, any> = {},
): Promise<T[]> {
  if (query === "article") {
    return placeholderArticles as T[];
  }

  if (query === "category") {
    const categories = Array.from(
      new Set(placeholderArticles.map((a) => a.category)),
    ).map((cat) => ({
      slug: cat.toLowerCase(),
      title: cat,
    }));
    return categories as T[];
  }

  return [];
}

function reshapeToArticle(item: CMSArticle): Article {
  return item;
}

function reshapeToCategory(item: CMSCategory): Category {
  return item;
}

export async function getArticles({
  limit,
  category,
  location,
  sortBy,
  excludeIds,
  isFeatured,
  isBreaking,
  excludeFeatured,
  searchQuery,
}: {
  limit?: number;
  category?: string;
  location?: string;
  sortBy?: "datePublished" | "views";
  excludeIds?: string[];
  isFeatured?: boolean;
  isBreaking?: boolean;
  excludeFeatured?: boolean;
  searchQuery?: string;
} = {}): Promise<Article[]> {
  const cmsArticles = await fetchContent<CMSArticle>("article");
  let articles = cmsArticles.map(reshapeToArticle);

  if (category) {
    articles = articles.filter(
      (article) => article.category.toLowerCase() === category.toLowerCase(),
    );
  }

  if (location) {
    articles = articles.filter(
      (article) => (article as any).location === location,
    );
  }

  if (searchQuery) {
    const lowerQuery = searchQuery.toLowerCase();
    articles = articles.filter(
      (article) =>
        article.title.toLowerCase().includes(lowerQuery) ||
        article.excerpt.toLowerCase().includes(lowerQuery) ||
        article.author.toLowerCase().includes(lowerQuery),
    );
  }

  if (isFeatured !== undefined) {
    articles = articles.filter((article) => article.isFeatured === isFeatured);
  }
  if (isBreaking !== undefined) {
    articles = articles.filter((article) => article.isBreaking === isBreaking);
  }
  if (excludeFeatured) {
    articles = articles.filter((article) => !article.isFeatured);
  }
  if (excludeIds && excludeIds.length > 0) {
    articles = articles.filter((article) => !excludeIds.includes(article.id));
  }

  if (sortBy === "views") {
    articles.sort((a, b) => (b.views || 0) - (a.views || 0));
  } else {
    // Default sort by datePublished (newest first)
    articles.sort(
      (a, b) =>
        new Date(b.datePublished).getTime() -
        new Date(a.datePublished).getTime(),
    );
  }

  if (limit) {
    return articles.slice(0, limit);
  }
  return articles;
}

export async function getArticleBySlug(
  slug: string,
): Promise<Article | undefined> {
  const cmsArticles = await fetchContent<CMSArticle>("article");
  const articles = cmsArticles.map(reshapeToArticle);
  return articles.find((article) => article.slug === slug);
}

export async function getCategories(): Promise<string[]> {
  const cmsCategories = await fetchContent<CMSCategory>("category");
  const categories = cmsCategories.map(reshapeToCategory);
  return categories
    .filter((cat) => cat.title !== "Local") // Exclude Local from main categories
    .map((cat) => cat.title)
    .sort();
}

export async function getCategoryBySlug(
  slug: string
): Promise<Category | undefined> {
  const cmsCategories = await fetchContent<CMSCategory>("category");
  const categories = cmsCategories.map(reshapeToCategory);
  return categories.find((category) => category.slug === slug);
}