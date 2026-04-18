import 'dotenv/config';
import { config } from 'dotenv';
import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import { companyInfo, services, testimonials, portfolioProjects } from './schema';

config({ path: '.env.local' });

async function seed() {
  console.log('\n🌱 Starting database seed...\n');

  const connection = await mysql.createConnection(process.env.DATABASE_URL!);
  const db = drizzle(connection);

  // ── Seed Company Info ──
  console.log('📋 Seeding company info...');
  const companyInfoData = [
    {
      key: 'brand_tagline',
      value: 'Transforming Spaces. Creating Experiences.',
    },
    {
      key: 'company_story',
      value: JSON.stringify({
        en: 'Icon Events was founded in 2015 with a bold vision: to redefine how brands connect with their audiences through immersive event experiences. Starting from a small studio with a handful of passionate designers, we have grown into a full-service event and exhibition company trusted by leading brands across the region. Our journey has been marked by relentless innovation, creative risk-taking, and an unwavering commitment to excellence. Today, we continue to push boundaries, blending cutting-edge technology with artistic vision to create events that leave lasting impressions.',
        ar: 'تأسست أيقونة الفعاليات في عام 2015 برؤية جريئة: إعادة تعريف كيفية تواصل العلامات التجارية مع جمهورها من خلال تجارب فعاليات غامرة. بدءاً من استوديو صغير مع مجموعة من المصممين المتحمسين، نمونا لنصبح شركة خدمات كاملة للفعاليات والمعارض موثوقة من قبل العلامات التجارية الرائدة في المنطقة.',
      }),
    },
    {
      key: 'vision',
      value: JSON.stringify({
        en: 'To be the most innovative event design company in the region, setting new standards for immersive brand experiences.',
        ar: 'أن نكون شركة تصميم الفعاليات الأكثر ابتكاراً في المنطقة، ونضع معايير جديدة لتجارب العلامات التجارية الغامرة.',
      }),
    },
    {
      key: 'mission',
      value: JSON.stringify({
        en: 'We transform ordinary spaces into extraordinary experiences by combining creative design, cutting-edge technology, and meticulous execution to help brands tell their stories in unforgettable ways.',
        ar: 'نحوّل المساحات العادية إلى تجارب استثنائية من خلال الجمع بين التصميم الإبداعي والتكنولوجيا المتطورة والتنفيذ الدقيق لمساعدة العلامات التجارية على سرد قصصها بطرق لا تُنسى.',
      }),
    },
    {
      key: 'statistics',
      value: JSON.stringify({
        eventsCompleted: 350,
        happyClients: 120,
        yearsExperience: 10,
        countriesServed: 8,
      }),
    },
    {
      key: 'team_members',
      value: JSON.stringify([
        { name: 'Aisha Khan', role: 'Creative Director', bio: 'Leads visual experience design for immersive event launches and exhibitions.', photoUrl: null, displayOrder: 1 },
        { name: 'Daniel Lee', role: 'Operations Lead', bio: 'Coordinates venue logistics, production schedules, and vendor execution.', photoUrl: null, displayOrder: 2 },
        { name: 'Sara Martinez', role: 'Design Manager', bio: 'Oversees spatial design and brand environment integration for all projects.', photoUrl: null, displayOrder: 3 },
        { name: 'Omar Hassan', role: 'Technology Director', bio: 'Brings cutting-edge AV, lighting, and interactive tech to every event.', photoUrl: null, displayOrder: 4 },
      ]),
    },
    {
      key: 'timeline',
      value: JSON.stringify([
        { year: 2015, title: 'Founded', description: 'Icon Events was born from a passion for creating unforgettable experiences.' },
        { year: 2017, title: 'First Major Exhibition', description: 'Designed and executed a 5,000 sqm exhibition space for a leading tech company.' },
        { year: 2019, title: 'Regional Expansion', description: 'Expanded operations to serve clients across 5 countries in the region.' },
        { year: 2021, title: 'Digital Innovation', description: 'Launched hybrid event solutions combining physical and virtual experiences.' },
        { year: 2023, title: 'Industry Recognition', description: 'Won the Regional Excellence Award for best exhibition design.' },
        { year: 2025, title: '10 Year Anniversary', description: 'Celebrating a decade of transforming spaces and creating extraordinary experiences.' },
      ]),
    },
  ];

  for (const item of companyInfoData) {
    await db
      .insert(companyInfo)
      .values(item)
      .onDuplicateKeyUpdate({ set: { value: item.value } });
  }
  console.log(`  ✅ Seeded ${companyInfoData.length} company info keys`);

  // ── Seed Services ──
  console.log('📋 Seeding services...');
  const servicesData = [
    { title: 'Exhibition Design & Build', description: 'Custom-designed exhibition stands and pavilions that capture attention and communicate your brand story with precision and impact.', icon: 'Palette', displayOrder: 1 },
    { title: 'Corporate Events', description: 'End-to-end corporate event management including conferences, seminars, product launches, and annual gatherings.', icon: 'Building2', displayOrder: 2 },
    { title: 'Trade Show Management', description: 'Comprehensive trade show solutions from booth design to logistics, staffing, and post-show analytics.', icon: 'BarChart3', displayOrder: 3 },
    { title: 'Brand Activations', description: 'Interactive brand experiences that create meaningful connections between your brand and target audience.', icon: 'Zap', displayOrder: 4 },
    { title: 'Product Launches', description: 'Spectacular product reveal events designed to generate buzz, media coverage, and lasting impressions.', icon: 'Rocket', displayOrder: 5 },
    { title: 'Spatial & Interior Design', description: 'Transforming venues and spaces with innovative interior design tailored for events and permanent installations.', icon: 'Layout', displayOrder: 6 },
  ];

  const existingServices = await db.select().from(services);
  if (existingServices.length === 0) {
    await db.insert(services).values(servicesData);
    console.log(`  ✅ Seeded ${servicesData.length} services`);
  } else {
    console.log('  ⏭️  Services already exist, skipping');
  }

  // ── Seed Testimonials ──
  console.log('📋 Seeding testimonials...');
  const testimonialsData = [
    { clientName: 'Sarah Johnson', clientTitle: 'VP of Marketing, TechVision Inc.', content: 'Icon Events transformed our annual conference into an unforgettable experience. The attention to detail and creative vision were outstanding.', rating: 5, displayOrder: 1, featured: true },
    { clientName: 'Ahmed Al-Rashid', clientTitle: 'CEO, Gulf Trade Group', content: 'Working with Icon Events on our trade show booth was the best decision we made. They delivered a stunning design that attracted more visitors than ever before.', rating: 5, displayOrder: 2, featured: true },
    { clientName: 'Maria Chen', clientTitle: 'Brand Director, Luxe Cosmetics', content: 'The product launch event they designed for us was absolutely spectacular. The immersive environment perfectly captured our brand essence.', rating: 5, displayOrder: 3, featured: true },
    { clientName: 'James Wilson', clientTitle: 'Events Manager, Global Finance Corp', content: 'Professional, creative, and reliable. Icon Events has been our go-to partner for corporate events for three years running.', rating: 4, displayOrder: 4, featured: false },
  ];

  const existingTestimonials = await db.select().from(testimonials);
  if (existingTestimonials.length === 0) {
    await db.insert(testimonials).values(testimonialsData);
    console.log(`  ✅ Seeded ${testimonialsData.length} testimonials`);
  } else {
    console.log('  ⏭️  Testimonials already exist, skipping');
  }

  // ── Seed Portfolio ──
  console.log('📋 Seeding portfolio projects...');
  const portfolioData = [
    { title: 'TechVision Global Summit 2024', description: 'A cutting-edge technology conference featuring interactive demo zones and holographic presentations for 3,000+ attendees.', category: 'Corporate Events', clientName: 'TechVision Inc.', year: 2024, budgetMin: 75000, budgetMax: 100000, budgetDisplay: '$75K - $100K', teamSize: 25, displayOrder: 1, featured: true, images: '[]' },
    { title: 'Gulf Trade Expo Pavilion', description: 'A 2,000 sqm exhibition pavilion with modular meeting rooms and an LED-wrapped facade.', category: 'Exhibitions', clientName: 'Gulf Trade Group', year: 2024, budgetMin: 50000, budgetMax: 75000, budgetDisplay: '$50K - $75K', teamSize: 18, displayOrder: 2, featured: true, images: '[]' },
    { title: 'Luxe Cosmetics: Ethereal Launch', description: 'An exclusive product launch event with projection mapping, custom scent diffusion, and interactive beauty stations.', category: 'Product Launches', clientName: 'Luxe Cosmetics', year: 2023, budgetMin: 40000, budgetMax: 60000, budgetDisplay: '$40K - $60K', teamSize: 15, displayOrder: 3, featured: true, images: '[]' },
    { title: 'FinanceForward Annual Gala', description: 'An elegant corporate gala for 500 guests featuring dynamic stage design and hybrid streaming.', category: 'Corporate Events', clientName: 'Global Finance Corp', year: 2023, budgetMin: 30000, budgetMax: 50000, budgetDisplay: '$30K - $50K', teamSize: 12, displayOrder: 4, featured: false, images: '[]' },
    { title: 'AutoDrive Brand Experience', description: 'A multi-sensory brand activation featuring test drive simulations and AR vehicle configurators.', category: 'Brand Activations', clientName: 'AutoDrive Motors', year: 2024, budgetMin: 60000, budgetMax: 85000, budgetDisplay: '$60K - $85K', teamSize: 20, displayOrder: 5, featured: false, images: '[]' },
    { title: 'MedTech Innovation Showcase', description: 'A specialized trade show booth with hands-on medical device demonstrations and data visualization walls.', category: 'Trade Shows', clientName: 'MedTech Solutions', year: 2023, budgetMin: 25000, budgetMax: 40000, budgetDisplay: '$25K - $40K', teamSize: 10, displayOrder: 6, featured: false, images: '[]' },
  ];

  const existingPortfolio = await db.select().from(portfolioProjects);
  if (existingPortfolio.length === 0) {
    await db.insert(portfolioProjects).values(portfolioData);
    console.log(`  ✅ Seeded ${portfolioData.length} portfolio projects`);
  } else {
    console.log('  ⏭️  Portfolio projects already exist, skipping');
  }

  console.log('\n✅ Database seed complete!\n');
  await connection.end();
  process.exit(0);
}

seed().catch((err) => {
  console.error('❌ Seed failed:', err);
  process.exit(1);
});
