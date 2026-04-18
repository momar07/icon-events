'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { CheckCircle, Send } from 'lucide-react';

const contactSchema = z.object({
  name: z.string().min(2).max(255),
  email: z.string().email().max(320),
  phone: z.string().max(20).optional().or(z.literal('')),
  eventType: z.string().optional().or(z.literal('')),
  eventDate: z.string().optional().or(z.literal('')),
  budgetRange: z.string().optional().or(z.literal('')),
  message: z.string().min(10).max(5000),
  website: z.string().max(0).optional().default(''),
});

type ContactFormValues = z.infer<typeof contactSchema>;

interface Service {
  id: number;
  title: string;
}

export function ContactForm() {
  const t = useTranslations('contact');
  const [services, setServices] = useState<Service[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      eventType: '',
      eventDate: '',
      budgetRange: '',
      message: '',
      website: '',
    },
  });

  // Load services for event type dropdown
  useEffect(() => {
    fetch('/api/services')
      .then((res) => res.json())
      .then((json) => {
        if (json.success) setServices(json.data);
      })
      .catch(() => {});
  }, []);

  const onSubmit = async (data: ContactFormValues) => {
    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const json = await res.json();

      if (json.success) {
        setIsSubmitted(true);
        reset();
        toast.success(t('successTitle'), { description: t('successMessage') });
      } else {
        toast.error(json.error || t('errorMessage'));
      }
    } catch {
      toast.error(t('errorMessage'));
    }
  };

  // Budget options
  const budgetOptions = [
    { value: 'under10k', label: t('budgetOptions.under10k') },
    { value: '10kTo25k', label: t('budgetOptions.10kTo25k') },
    { value: '25kTo50k', label: t('budgetOptions.25kTo50k') },
    { value: '50kTo100k', label: t('budgetOptions.50kTo100k') },
    { value: 'above100k', label: t('budgetOptions.above100k') },
  ];

  const eventTypeOptions = services.map((s) => ({
    value: s.title,
    label: s.title,
  }));

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full border-2 border-[#2EF2B1]/30 bg-[#2EF2B1]/10">
          <CheckCircle size={40} className="text-[#2EF2B1]" />
        </div>
        <h3 className="heading-3 mb-3 text-[#F5F7FA]">{t('successTitle')}</h3>
        <p className="mb-8 max-w-md text-[#A0AEC0]">{t('successMessage')}</p>
        <Button variant="outline" onClick={() => setIsSubmitted(false)}>
          Send Another Inquiry
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <Input
          id="name"
          label={t('name')}
          placeholder="John Doe"
          error={errors.name?.message}
          {...register('name')}
        />
        <Input
          id="email"
          type="email"
          label={t('email')}
          placeholder="john@example.com"
          error={errors.email?.message}
          {...register('email')}
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Input
          id="phone"
          type="tel"
          label={t('phone')}
          placeholder="+1 (555) 123-4567"
          error={errors.phone?.message}
          {...register('phone')}
        />
        <Select
          id="eventType"
          label={t('eventType')}
          placeholder={t('selectEventType')}
          options={eventTypeOptions}
          error={errors.eventType?.message}
          {...register('eventType')}
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Input
          id="eventDate"
          type="date"
          label={t('eventDate')}
          error={errors.eventDate?.message}
          {...register('eventDate')}
        />
        <Select
          id="budgetRange"
          label={t('budgetRange')}
          placeholder={t('selectBudget')}
          options={budgetOptions}
          error={errors.budgetRange?.message}
          {...register('budgetRange')}
        />
      </div>

      <Textarea
        id="message"
        label={t('message')}
        placeholder="Tell us about your event vision, expected attendees, and any specific requirements..."
        rows={5}
        error={errors.message?.message}
        {...register('message')}
      />

      {/* Honeypot */}
      <div className="absolute -left-[9999px] opacity-0" aria-hidden="true">
        <input type="text" tabIndex={-1} autoComplete="off" {...register('website')} />
      </div>

      <Button type="submit" size="lg" variant="primary" isLoading={isSubmitting} className="w-full sm:w-auto">
        <Send size={18} className="mr-2" />
        {isSubmitting ? t('submitting') : t('submitButton')}
      </Button>
    </form>
  );
}
