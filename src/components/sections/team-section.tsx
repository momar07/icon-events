import { Card } from '@/components/ui/card';
import { User } from 'lucide-react';

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  photoUrl?: string | null;
  displayOrder: number;
}

interface TeamSectionProps {
  title: string;
  members: TeamMember[];
}

export function TeamSection({ title, members }: TeamSectionProps) {
  if (members.length === 0) return null;

  const sorted = [...members].sort((a, b) => a.displayOrder - b.displayOrder);

  return (
    <section className="section-padding">
      <div className="container-custom">
        <h2 className="heading-2 neon-text-pink mb-12 text-center">{title}</h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {sorted.map((member, index) => (
            <Card key={index} hover className="p-6 text-center">
              {/* Avatar */}
              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center overflow-hidden rounded-full border-2 border-[#FF006E]/30 bg-[#252B4A]">
                {member.photoUrl ? (
                  <img
                    src={member.photoUrl}
                    alt={member.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <User size={36} className="text-[#A0AEC0]" />
                )}
              </div>

              <h3 className="mb-1 text-lg font-semibold text-[#F5F7FA]">{member.name}</h3>
              <p className="mb-3 text-sm font-medium text-[#FF006E]">{member.role}</p>
              <p className="text-sm text-[#A0AEC0]">{member.bio}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
