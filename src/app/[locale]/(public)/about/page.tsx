import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import { getLocale } from 'next-intl/server';
import { generateMeta } from '@/lib/utils/seo';
import { getCompanyInfoValue } from '@/lib/repositories/company-info.repo';
import { SectionHeader } from '@/components/ui/section-header';
import { TeamSection } from '@/components/sections/team-section';
import { TimelineSection } from '@/components/sections/timeline';
import { StatsCounter } from '@/components/sections/stats-counter';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return generateMeta({
    title: 'About Us',
    description: 'Learn about our journey, our team, and what drives us to create extraordinary events.',
    path: '/about',
    locale,
  });
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('about');

  // Fetch all company info
  const [story, vision, mission, statistics, teamMembers, timeline] = await Promise.all([
    getCompanyInfoValue<{ en: string; ar: string }>('company_story'),
    getCompanyInfoValue<{ en: string; ar: string }>('vision'),
    getCompanyInfoValue<{ en: string; ar: string }>('mission'),
    getCompanyInfoValue<{ eventsCompleted?: number; happyClients?: number; yearsExperience?: number; countriesServed?: number }>('statistics'),
    getCompanyInfoValue<any[]>('team_members'),
    getCompanyInfoValue<any[]>('timeline'),
  ]);

  // Build stats array
  const stats = statistics ? [
    { label: 'Events Completed', value: statistics.eventsCompleted || 0 },
    { label: 'Happy Clients', value: statistics.happyClients || 0 },
    { label: 'Years Experience', value: statistics.yearsExperience || 0 },
    { label: 'Countries Served', value: statistics.countriesServed || 0 },
  ] : [];

  const localizedText = (obj: { en: string; ar: string } | null) => {
    if (!obj) return '';
    return locale === 'ar' ? obj.ar : obj.en;
  };

  return (
    <div className="pt-20">
      {/* Header */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionHeader title={t('title')} subtitle={t('subtitle')} />
        </div>
      </section>

      {/* Story */}
      {story && (
        <section className="section-padding bg-[#1A1F3A]/30">
          <div className="container-custom">
            <div className="mx-auto max-w-3xl">
              <h2 className="heading-2 neon-text-cyan mb-6">{t('storyTitle')}</h2>
              <p className="body-large whitespace-pre-line">{localizedText(story)}</p>
            </div>
          </div>
        </section>
      )}

      {/* Vision & Mission */}
      {(vision || mission) && (
        <section className="section-padding">
          <div className="container-custom">
            <div className="grid gap-8 md:grid-cols-2">
              {vision && (
                <div className="rounded-xl border border-[#252B4A] bg-[#1A1F3A] p-8">
                  <h3 className="heading-3 neon-text-pink mb-4">{t('visionTitle')}</h3>
                  <p className="text-[#A0AEC0]">{localizedText(vision)}</p>
                </div>
              )}
              {mission && (
                <div className="rounded-xl border border-[#252B4A] bg-[#1A1F3A] p-8">
                  <h3 className="heading-3 neon-text-pink mb-4">{t('missionTitle')}</h3>
                  <p className="text-[#A0AEC0]">{localizedText(mission)}</p>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Stats */}
      <StatsCounter title={t('statsTitle')} stats={stats} />

      {/* Team */}
      <TeamSection title={t('teamTitle')} members={teamMembers || []} />

      {/* Timeline */}
      <TimelineSection title={t('timelineTitle')} entries={timeline || []} />
    </div>
  );
}
