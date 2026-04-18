'use client';

import { useState, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { PortfolioCard } from './portfolio-card';
import { PortfolioFilters } from './portfolio-filters';
import { SectionHeader } from '@/components/ui/section-header';
import { Button } from '@/components/ui/button';
import { EmptyState } from '@/components/ui/empty-state';
import { Spinner } from '@/components/ui/spinner';

interface Project {
  id: number;
  title: string;
  description: string;
  category: string;
  clientName: string | null;
  year: number | null;
  teamSize: number | null;
  budgetDisplay: string | null;
  featured: boolean;
  images: any;
}

interface PortfolioGridProps {
  initialProjects: Project[];
  initialTotal: number;
  categories: string[];
}

export function PortfolioGrid({ initialProjects, initialTotal, categories }: PortfolioGridProps) {
  const t = useTranslations('portfolio');
  const tCommon = useTranslations('common');
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [total, setTotal] = useState(initialTotal);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const limit = 12;

  const hasMore = projects.length < total;

  const fetchProjects = useCallback(async (cat: string | null, pageNum: number, append: boolean) => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      if (cat) params.set('category', cat);
      params.set('page', String(pageNum));
      params.set('limit', String(limit));

      const res = await fetch(`/api/portfolio?${params.toString()}`);
      const json = await res.json();

      if (json.success) {
        if (append) {
          setProjects((prev) => [...prev, ...json.data]);
        } else {
          setProjects(json.data);
        }
        setTotal(json.meta?.total || 0);
      }
    } catch (error) {
      console.error('Failed to fetch portfolio:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleCategoryChange = (cat: string | null) => {
    setActiveCategory(cat);
    setPage(1);
    fetchProjects(cat, 1, false);
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchProjects(activeCategory, nextPage, true);
  };

  return (
    <section className="section-padding">
      <div className="container-custom">
        <SectionHeader title={t('title')} subtitle={t('subtitle')} />

        {/* Filters */}
        <div className="mt-10 mb-12">
          <PortfolioFilters
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={handleCategoryChange}
          />
        </div>

        {/* Grid */}
        {projects.length === 0 && !isLoading ? (
          <EmptyState
            title={tCommon('noResults')}
            message="No projects match your filter. Try a different category."
          />
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <PortfolioCard key={project.id} {...project} />
            ))}
          </div>
        )}

        {/* Load More */}
        {hasMore && (
          <div className="mt-12 flex justify-center">
            <Button
              variant="outline"
              size="lg"
              onClick={handleLoadMore}
              isLoading={isLoading}
            >
              {tCommon('loadMore')}
            </Button>
          </div>
        )}

        {isLoading && projects.length > 0 && (
          <div className="mt-8 flex justify-center">
            <Spinner />
          </div>
        )}
      </div>
    </section>
  );
}
